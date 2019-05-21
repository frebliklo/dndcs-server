import { Field, ObjectType } from 'type-graphql'
import { User } from '../generated/prisma-client'
import AuthUserType from './AuthUserType'

@ObjectType()
class AuthType {
  @Field()
  token: string

  @Field(type => AuthUserType)
  user: User
}

export default AuthType
