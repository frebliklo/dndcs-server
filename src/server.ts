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

app.post('/api/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    res.status(500).send()
  }
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (err) {
    res.status(500).send()
  }
})

app.patch('/api/users/:id', async (req, res) => {
  const { body, id } = req.params

  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.post('/api/characters', async (req, res) => {
  const character = new Character(req.body)

  try {
    await character.save()
    res.status(201).send(character)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/api/characters', async (req, res) => {
  try {
    const characters = await Character.find({})
    res.send(characters)
  } catch (err) {
    res.status(500).send()
  }
})

app.get('/api/characters/:id', async (req, res) => {
  const { id } = req.params

  try {
    const character = await Character.findById(id)

    if (!character) {
      return res.status(404).send()
    }

    res.send(character)
  } catch (err) {
    res.status(500).send()
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
