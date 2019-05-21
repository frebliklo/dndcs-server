import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
class AuthUserType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string
}

export default AuthUserType
