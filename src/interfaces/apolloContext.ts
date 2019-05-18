import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Prisma } from '../generated/prisma-client'

interface IApolloContext extends ExpressContext {
  userId?: string
  prisma: Prisma
}

export default IApolloContext
