import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { prisma } from '../../generated/prisma-client'
import createSchema from '../../utils/createSchema'

module.exports = async () => {
  const app = Express()

  const schema = await createSchema()

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        req,
        prisma,
      }
    },
  })

  apolloServer.applyMiddleware({ app, path: '/graphql' })

  const port = process.env.PORT || 5555

  global.httpServer = app.listen(port)
}
