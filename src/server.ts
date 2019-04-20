import bodyParser from 'body-parser'
import express from 'express'
import './db/mongoose'
import Character from './models/character'
import User from './models/user'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/api/users', (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      res.status(201).send(user)
    })
    .catch(err => res.status(400).send(err))
})

app.get('/api/users', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send())
})

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send()
      }

      res.send(user)
    })
    .catch(err => res.status(500).send())
})

app.post('/api/characters', (req, res) => {
  const character = new Character(req.body)

  character
    .save()
    .then(() => {
      res.status(201).send(character)
    })
    .catch(err => res.status(400).send(err))
})

app.get('/api/characters', (req, res) => {
  Character.find({})
    .then(characters => res.send(characters))
    .catch(err => res.status(500).send())
})

app.get('/api/characters/:id', (req, res) => {
  const { id } = req.params

  Character.findById(id)
    .then(character => {
      if (!character) {
        return res.status(404).send()
      }

      res.send(character)
    })
    .catch(err => res.status(500).send())
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
