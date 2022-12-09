const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined){ blog.likes = 0}
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async(request, response) => {
    console.log(request.body)
    const blog = {
        id: request.body.id,
        title:request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes}
    
   
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,{ new: true, runValidators: true, context: 'query' })
    response.status(201).json(savedBlog)
    
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter