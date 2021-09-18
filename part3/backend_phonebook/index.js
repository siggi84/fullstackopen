require('dotenv').config()
const express = require('express')
const app = express()

var morgan = require('morgan')
morgan.token('body', function (req) { return JSON.stringify(req.body) })

var logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
})

app.use(logger)

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use(express.static('build'))


const Person = require('./models/person')

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.find({}).then(result => {
    response.send(`Phonebook has info for ${result.length} peoples.<br><br>${date}`)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  Person.findById(id).then(person => {
    console.log(id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id.toString()
  Person.findByIdAndDelete(id).then(result => {
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Person.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person(body)
  person.save().then(result => {
    response.json(result)
  })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malfortmatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else {
    console.log(error.message)
    response.status(500).end()
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
