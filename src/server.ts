import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import './db/mongoose'
import auth from './middleware/auth'
import resolvers from './resolvers'
// import maintenanceMode from './middleware/maintenance'
import authRouter from './routers/authRouter'
import characterRouter from './routers/characterRouter'
import userRouter from './routers/userRouter'

const main = async () => {
  const app = Express()

  app.use(bodyParser.json())
  app.use(cors())

  // Uncomment next line when in maintenance
  // app.use(maintenanceMode)

  app.use('/api/auth', authRouter)
  app.use('/api/users', auth, userRouter)
  app.use('/api/characters', auth, characterRouter)

  const schema = await buildSchema({
    resolvers,
  })

  const apolloServer = new ApolloServer({ schema })

  apolloServer.applyMiddleware({ app })

  const port = process.env.PORT || 5000

  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App listening on at http://localhost:${port}`)
  })
}

main()
