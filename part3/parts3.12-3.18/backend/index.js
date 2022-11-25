require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())



const errorHandler = (error, request, response, next) => {
   
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-unused-vars
morgan.token('content', function (req, res) {
    if(Object.keys(req.body).length === 0){ return null} return JSON.stringify(req.body)
})

app.get('/info', (req, res) => {
    
    Person.find({}).then(persons => {
        console.log(persons)
        console.log(persons.length)
        const number=persons.length
    
    
    
        const date = new Date()  
        const options = {  
            weekday: 'short', year: 'numeric', month: 'short',  
            day: 'numeric', hour12: false, timezone: 'EEST'
          
        }

        console.log()
        const requestTime=date.toLocaleTimeString('en-us', options)+' GMT+0200 (Eastern European Standard Time'
        const message= 'Phonebook has info for '+number+' people'
        const respone = {message, requestTime}
        res.send(respone)
    })
})
  

app.get('/api/persons', (req, res) => {
    // res.json(persons)
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
   
    Person.findById(request.params.id).then(person => {
      
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
    
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
  
    Person.findByIdAndUpdate(request.params.id, person,  { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error =>{ 
            
            response.status(400).json({ error: error.message })
            next(error)
        })
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
   
    return id
}

  
app.post('/api/persons', (request, response,next) => {
    const body = request.body

    // if (Person.find(person=> person.name==body.name)) {
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //       })
    // }
  
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error =>{ 
            next(error)
            response.status(400).json({ error: error.message })
        })


})
  
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
