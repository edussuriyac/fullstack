const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
   
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.errorHandler)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs/:id/comments', commentsRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)


  

module.exports = app