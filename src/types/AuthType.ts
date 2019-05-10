import { Field, ObjectType } from 'type-graphql'
import { User } from '../generated/prisma-client'
import UserType from './UserType'

@ObjectType()
class AuthType {
  @Field()
  token: string

  @Field(type => UserType)
  user: User
}

export default AuthType
