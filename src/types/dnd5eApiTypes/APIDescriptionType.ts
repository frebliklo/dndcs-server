import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class APIDescriptionType {
  @Field(type => String)
  name: string

  @Field(type => [String])
  desc: string[]
}

export default APIDescriptionType
