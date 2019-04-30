import { Field, Int, ObjectType, Root } from 'type-graphql'
import { IHitDie } from '../interfaces/character'

@ObjectType()
class HitDieType {
  @Field(type => Int, { description: 'Type of die used', name: 'type' })
  typeField(@Root() root: IHitDie) {
    return root.type
  }

  @Field(type => Int, { description: 'Number of hit die', name: 'amount' })
  amountField(@Root() root: IHitDie) {
    return root.amount
  }
}

export default HitDieType
