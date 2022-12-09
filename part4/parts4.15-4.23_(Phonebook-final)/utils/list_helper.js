var _ = require('lodash')


const totalLikes = (blogs) => {
  
   
    const likes = blogs.reduce((s,p) => s+p.likes,0)
    return likes
}

const maxLikes = (blogs) => {
  
    
    const likes = Math.max(...blogs.map(blog => blog.likes))
    
    return likes
}

const authorBlogs = (blogs) => {
    
    const authorBookCount = _(blogs)
        .groupBy('author')
        .map(function(blogsByAuthor,author) {
            return {
                author: author,
                blogs: blogsByAuthor.length
            }
        }).value()
    
    return Math.max(...authorBookCount.map(author => author.blogs))
}

const authorLikes = (blogs) => {
   
    const authorBlogsCount = _(blogs)
        .groupBy('author')
        .map(function(blogsByAuthor,author) {
            return {
                author: author,
                likes: blogsByAuthor.reduce((s,p) => s+p.likes,0)
            }
        }).value()
    
    return Math.max(...authorBlogsCount.map(author => author.likes))
}

module.exports = {
    
    totalLikes,
    maxLikes,
    authorBlogs,
    authorLikes
}