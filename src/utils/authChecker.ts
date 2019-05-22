import { AuthChecker } from 'type-graphql'
import ApolloContext from '../interfaces/apolloContext'
import getUserId from './getUserId'

const authChecker: AuthChecker<ApolloContext> = ({ context }) => {
  const userId = getUserId(context.req)

  return !!userId
}

export default authChecker
