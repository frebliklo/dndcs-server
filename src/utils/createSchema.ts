import { buildSchema } from 'type-graphql'
import resolvers from '../resolvers'
import authChecker from './authChecker'

const createSchema = () =>
  buildSchema({
    resolvers,
    dateScalarMode: 'timestamp',
    authChecker,
  })

export default createSchema
