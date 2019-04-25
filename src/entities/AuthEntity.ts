import { Field, ObjectType } from 'type-graphql'
import { IUserDoc } from '../interfaces/user'
import UserEntity from './UserEntity'

@ObjectType()
class AuthEntity {
  @Field()
  token: string

  @Field(type => UserEntity)
  user: IUserDoc
}

export default AuthEntity
