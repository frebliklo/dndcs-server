import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import './db/mongoose'
import auth from './middleware/auth'
import maintenanceMode from './middleware/maintenance'
import authRouter from './routers/authRouter'
import characterRouter from './routers/characterRouter'
import userRouter from './routers/userRouter'

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Uncomment next line when in maintenance
// app.use(maintenanceMode)

app.use('/api/auth', authRouter)
app.use('/api/users', auth, userRouter)
app.use('/api/characters', auth, characterRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
