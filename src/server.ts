import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import queryComplexity, {
  fieldConfigEstimator,
  simpleEstimator,
} from 'graphql-query-complexity'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import './db/mongoose'
import { prisma } from './generated/prisma-client'
import IApolloContext from './interfaces/apolloContext'
import auth from './middleware/auth'
import resolvers from './resolvers'
// import maintenanceMode from './middleware/maintenance'
import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'

const main = async () => {
  const app = Express()

  app.use(bodyParser.json())
  app.use(cors())

  // Uncomment next line when in maintenance
  // app.use(maintenanceMode)

  app.use('/api/auth', authRouter)
  app.use('/api/users', auth, userRouter)
  app.use('/graphql', auth)

  const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'timestamp',
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
        prisma,
      }

      return context
    },
    validationRules: [
      queryComplexity({
        maximumComplexity: 30,
        variables: {},
        onComplete: (complexity: number) => {
          // tslint:disable-next-line:no-console
          console.log('Query Complexity:', complexity)
        },
        estimators: [
          fieldConfigEstimator(),
          simpleEstimator({
            defaultComplexity: 1,
          }),
        ],
      }) as any,
    ],
  })

  apolloServer.applyMiddleware({ app, path: '/graphql' })

  const port = process.env.PORT || 5000

  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App listening on at http://localhost:${port}`)
  })
}

main()
