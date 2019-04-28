import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import RequestWithUser from './requestWithUser'

interface IApolloContext extends ExpressContext {
  req: RequestWithUser
}

export default IApolloContext
