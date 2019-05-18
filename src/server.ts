import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Express from 'express'
import queryComplexity, {
  fieldConfigEstimator,
  simpleEstimator,
} from 'graphql-query-complexity'
import 'reflect-metadata'
import { AuthChecker, buildSchema } from 'type-graphql'
import { AuthToken, prisma, Prisma } from './generated/prisma-client'
import IApolloContext from './interfaces/apolloContext'
import auth from './middleware/auth'
import resolvers from './resolvers'
// import maintenanceMode from './middleware/maintenance'
import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import verifyAuthToken from './utils/verifyAuthToken'

const authChecker: AuthChecker<IApolloContext> = ({ context }) => {
  return !!context.userId
}

const main = async () => {
  const app = Express()

  app.use(bodyParser.json())
  app.use(cors())

  // Uncomment next line when in maintenance
  // app.use(maintenanceMode)

  app.use('/api/auth', authRouter)
  app.use('/api/users', auth, userRouter)

  const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'timestamp',
    authChecker,
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = verifyAuthToken(token) as AuthToken

      if (!decoded) {
        return { prisma }
      }

      return {
        userId: decoded.id,
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

  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`App listening on at http://localhost:${port}`)
  })
}

main()
