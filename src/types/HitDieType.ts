import { Field, Int, ObjectType, Root } from 'type-graphql'
import { IHitDie } from '../interfaces/character'

@ObjectType()
class HitDieType {
  @Field(type => Int, { description: 'Type of die used', name: 'value' })
  valueField(@Root() root: IHitDie) {
    return root.diceValue
  }

  @Field(type => Int, { description: 'Number of hit die', name: 'count' })
  countField(@Root() root: IHitDie) {
    return root.diceCount
  }
}

export default HitDieType
