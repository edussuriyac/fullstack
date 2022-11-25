const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/info', (req, res) => {
    
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
  

personsRouter.get('/', (req, res) => {
    // res.json(persons)
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

personsRouter.get('/:id', (request, response, next) => {
   
    Person.findById(request.params.id).then(person => {
      
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
    
})

personsRouter.delete('/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
        name: body.name,
        number: body.number,
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
  
personsRouter.post('/', (request, response,next) => {
    const body = request.body
    
    const person = new Person({
        name: body.name,
        number: body.number,
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

module.exports = personsRouter