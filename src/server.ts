import { ApolloServer } from 'apollo-server-express'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import './db/mongoose'
import IApolloContext from './interfaces/apolloContext'
import apolloAuth from './middleware/apeolloAuth'
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
  app.use('/graphql', apolloAuth)

  const schema = await buildSchema({
    resolvers,
    authChecker: ({ context: { req } }) => {
      return !!req.user
    },
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: IApolloContext) => {
      const context = {
        req,
        user: req.user,
      }

      return context
    },
  })

  apolloServer.applyMiddleware({ app, path: '/graphql' })

  const port = process.env.PORT || 5000

  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App listening on at http://localhost:${port}`)
  })
}

main()
