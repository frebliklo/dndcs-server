import bodyParser from 'body-parser'
import express from 'express'
import './db/mongoose'
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
      res.send(user)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
