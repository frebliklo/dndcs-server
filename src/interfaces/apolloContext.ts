import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request } from 'express'
import { Prisma } from '../generated/prisma-client'

interface IApolloContext extends ExpressContext {
  req: Request
  prisma: Prisma
}

export default IApolloContext
