import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
class UserEntity {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}

export default UserEntity
