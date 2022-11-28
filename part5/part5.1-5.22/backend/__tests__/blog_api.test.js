const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
  
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
  
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart)
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify blog id name', async () => {
    const response = await api.get('/api/blogs')
  
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})
  
test('a valid blog can be added ', async () => {
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
        _id: '5a422aa71b54a676234d17f9',
        title: 'bl3',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        userId: usersAtStart[0].id,
        __v: 0
    }
   
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'bl3'
    )
})

test('blog with no likes should set to 0 ', async () => {
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
        _id: '5a422aa71b54a676234d17f5',
        title: 'bl3',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        userId: usersAtStart[0].id,
        __v: 0
    }
   
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
    
    const blogsAtEnd = await helper.blogsInDb()
    
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(
        0
    )
})
test('blog without url and title is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newBlog = {
        _id: '5a422aa71b54a676234d17f5',
        author: 'Edsger',
        userId: usersAtStart[0].id,
        __v: 0
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('update blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const usersAtStart = await helper.usersInDb()
    const updatedBlog = {
        title: 'bl2',
        author: 'Ed',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 50,
        userId: usersAtStart[0].id,
    }
   
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(201)
        
    const blogsAtEnd = await helper.blogsInDb()
   
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(
        50
    )
})



afterAll(() => {
    mongoose.connection.close()
}) 
