const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

const tokenExtractor = (request,response,next) => {
    
    const authorization = request.get('authorization')
   
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
       
    }
    next()
    return request
}

const userExtractor = async(request, response, next) => {
  
    // eslint-disable-next-line no-undef   
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
   
    const user= await User.findById(decodedToken.id)
 
    request.user=user
    next()
    return request

}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}