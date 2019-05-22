import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request } from 'express'
import { Prisma } from '../generated/prisma-client'

interface ApolloContext extends ExpressContext {
  req: Request
  prisma: Prisma
}

export default ApolloContext
