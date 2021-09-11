const express = require('express')
const app = express()

var morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

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
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)	
  const person = persons.find(person => (person.id === id))

  if (person) {
    response.json(person)
  } else {
		response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)	
  persons = persons.filter(p => (p.id !== id))

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

	if (!body.name & !body.number) {
		return response.status(400).json({error: 'name and number are missing'})
	} else if (!body.name) {
		return response.status(400).json({error: 'name is missing'})
  } else if (persons.map(p => p.name).includes(body.name)) {
		return response.status(400).json({error: 'name must be unique'})
	} else if (!body.number) {
		return response.status(400).json({error: 'number is missing'})
  }

  const N = 1000000
  const id = Math.floor(Math.random() * N)
  const person = {...body, id: id}
  persons = persons.concat(person)

	response.json(body)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`Phonebook has info for ${persons.length} peoples.<br><br>${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
