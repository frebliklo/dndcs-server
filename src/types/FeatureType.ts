import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
class FeatureType {
  @Field(type => ID)
  id: string

  @Field(type => Int, { description: 'Consumable index for dnd5eapi.co' })
  index: number

  @Field()
  name: string

  @Field(type => [String])
  description: string[]
}

export default FeatureType
