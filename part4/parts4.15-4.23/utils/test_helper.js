const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'bl1',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    },
    {
        _id: '507f1f77bcf86cd799439011',
        title: 'bl2',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async (token) => {
    const blogs = await Blog.find({}).set('Authorization', 'bearer '+ token)  
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb,usersInDb
}