const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  'mongodb+srv://chathu:password@cluster0.3fbleb0.mongodb.net/personsApp?retryWrites=true&w=majority'
  //'mongodb+srv://fullstack:$<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
  //`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personsSchema)

if (process.argv.length>3) {
const person = new Person({
  name: name,
  number: number,
  id: Math.floor(Math.random() * 1000)
})

person.save().then(result => {
  const message = 'added '+ name +' number ' + number +' to phonebook'
  console.log(message)
  mongoose.connection.close()
})
} else {
    console.log("Phonebook:")
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}