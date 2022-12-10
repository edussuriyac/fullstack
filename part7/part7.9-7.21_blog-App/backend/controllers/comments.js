const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
    const comment = new Comment(request.body)

    const savedComment = await comment.save()

    console.log(savedComment)
    

    console.log('***here comment')
    console.log(comment)
    const blog = await Blog.findById(comment.blogId)
    blog.comments= blog.comments.concat(savedComment)
    await blog.save()
    console.log ('**saved')
    const sblog = await Blog.findById(comment.blogId)
    console.log(sblog)
    response.status(201).json(savedComment)
    
})

module.exports = commentsRouter