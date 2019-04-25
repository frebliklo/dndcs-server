import { Field, ObjectType } from 'type-graphql'
import { IUserDoc } from '../interfaces/user'
import UserEntity from './User'

@ObjectType()
class AuthType {
  @Field()
  token: string

  @Field(type => UserEntity)
  user: IUserDoc
}

export default AuthType
