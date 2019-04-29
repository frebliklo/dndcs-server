import Axios, { AxiosResponse } from 'axios'
import { Field, ObjectType, Root } from 'type-graphql'
import { ISkill } from '../../interfaces/dndApi'
import AbilityScoreType from './AbilityScoreType'

@ObjectType()
class SkillType {
  @Field(type => String, { description: 'The abbreviated name for this skill' })
  name: string

  @Field(type => String, {
    description: 'A brief description on this skill and its uses',
  })
  desc: string[]

  @Field(type => AbilityScoreType, {
    description: 'The ability score associated with this skill',
  })
  async abilityScore(@Root() skill: ISkill): Promise<AxiosResponse> {
    const { data } = await Axios.get(skill.ability_score.url)

    return data
  }

  @Field(type => String, { description: 'The URL of the referenced resource' })
  url: string
}

export default SkillType
