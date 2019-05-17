import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Prisma } from '../generated/prisma-client'
import RequestWithUser from './requestWithUser'

interface IApolloContext extends ExpressContext {
  req: RequestWithUser
  prisma: Prisma
}

export default IApolloContext
