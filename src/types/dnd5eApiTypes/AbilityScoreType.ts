import { Field, ObjectType, Root } from 'type-graphql'
import { IAbilityScore } from '../../interfaces/dndApi'

@ObjectType()
class AbilityScoreType {
  @Field(type => String, {
    description: 'The abbreviated name for this ability score',
  })
  name: string

  @Field(type => String, {
    description: 'The full name for this ability scores',
  })
  fullName(@Root() abilityScore: IAbilityScore): string {
    return abilityScore.full_name
  }

  @Field(type => [String], {
    description: 'A brief description on this ability score and its uses',
  })
  desc: string[]

  //  Figure out how to iterate over the skills
  // @Field(type => [SkillType], {
  //   description: 'The ability score associated with this skill',
  // })
  // skills(@Root() root: IAbilityScore): ISkill[] {}

  @Field(type => String, { description: 'The URL of the referenced resource' })
  url: string
}

export default AbilityScoreType
