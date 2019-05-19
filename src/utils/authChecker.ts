import { AuthChecker } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import getUserId from './getUserId'

const authChecker: AuthChecker<IApolloContext> = ({ context }) => {
  const userId = getUserId(context.req)

  return !!userId
}

export default authChecker
