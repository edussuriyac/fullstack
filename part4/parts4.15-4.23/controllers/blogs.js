const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1,name:1})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const blog = new Blog(request.body)
    console.log(request.body)
    // const token = getTokenFrom(request)
 
    
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    console.log(user)
    blog.user= user._id
    if (blog.likes === undefined){ blog.likes = 0}
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async(request, response) => {
    console.log(request.body)
    const blog = {
        id: request.body.id,
        title:request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        userId: request.body.userId}
    
   
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,{ new: true, runValidators: true, context: 'query' })
    response.status(201).json(savedBlog)
    
})

blogsRouter.delete('/:id', async (request, response) => {
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    console.log(user)
    console.log(blog)
    if ( blog.user.toString() === user.id.toString() ){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    response.status(204).end()
})

module.exports = blogsRouter