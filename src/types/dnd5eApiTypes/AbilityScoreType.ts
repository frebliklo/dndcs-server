import Axios, { AxiosResponse } from 'axios'
import { Field, ObjectType, Root } from 'type-graphql'
import {
  IAbilityScore,
  ISkill,
  NamedAPIResource,
} from '../../interfaces/dndApi'
import SkillType from './SkillType'

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

  @Field(type => [SkillType], {
    description: 'A list of skills that uses this ability score',
    nullable: true,
  })
  async skill(@Root() abilityScore: IAbilityScore): Promise<ISkill[]> {
    // The typing here can definetly be done in a smarter way, but now it works ¯\_(ツ)_/¯
    const results: any = await Promise.all(
      abilityScore.skills.map(
        async (skill: NamedAPIResource): Promise<AxiosResponse> => {
          const { data } = await Axios.get(skill.url)
          return data
        }
      )
    )

    return results
  }

  @Field(type => String, { description: 'The URL of the referenced resource' })
  url: string
}

export default AbilityScoreType
