import { Field, ObjectType } from 'type-graphql'
import { IUserDoc } from '../interfaces/user'
import UserType from './UserType'

@ObjectType()
class AuthType {
  @Field()
  token: string

  @Field(type => UserType)
  user: IUserDoc
}

export default AuthType
