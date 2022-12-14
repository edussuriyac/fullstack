const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
const app = express()
app.use(express.json())

morgan.token('content', function (req, res) {
    if(Object.keys(req.body).length === 0){ return null} return JSON.stringify(req.body)
  })

  
app.use(morgan(':method :url - :response-time ms :content'))


let persons = [
    
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
        
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    number=persons.length
    
    date = new Date();  
    options = {  
        weekday: "short", year: "numeric", month: "short",  
        day: "numeric", hour12: false, timezone: "EEST"
      
    }

    console.log()
    requestTime=date.toLocaleTimeString("en-us", options)+' GMT+0200 (Eastern European Standard Time'
    message= 'Phonebook has info for '+number+' people'
    respone = {message, requestTime}
    res.send(respone)
  })
  

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
   
    return id
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
   
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }

    if (persons.find(person=> person.name==body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
