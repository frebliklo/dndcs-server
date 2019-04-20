import bodyParser from 'body-parser'
import express from 'express'
import './db/mongoose'
import characterRouter from './routers/characterRouter'
import userRouter from './routers/userRouter'

const app = express()

app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/characters', characterRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
