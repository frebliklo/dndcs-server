import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import queryComplexity, {
  fieldConfigEstimator,
  simpleEstimator,
} from 'graphql-query-complexity'
import 'reflect-metadata'
import { prisma } from './generated/prisma-client'
import auth from './middleware/auth'
// import maintenanceMode from './middleware/maintenance'
import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import createSchema from './utils/createSchema'

export const startServer = async () => {
  const app = Express()

  app.use(bodyParser.json())
  app.use(cors())

  // Uncomment next line when in maintenance
  // app.use(maintenanceMode)

  app.use('/api/auth', authRouter)
  app.use('/api/users', auth, userRouter)

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      return {
        req,
        prisma,
      }
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

  const server = await app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App listening on at http://localhost:${port}`)
  })

  return server
}

startServer()
