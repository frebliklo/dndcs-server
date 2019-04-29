import Axios, { AxiosResponse } from 'axios'
import { Arg, Query, registerEnumType, Resolver } from 'type-graphql'
import { AbilityScoreEnum, SkillEnum } from '../interfaces/dndApi'
import AbilityScoreType from '../types/dnd5eApiTypes/AbilityScoreType'
import SkillType from '../types/dnd5eApiTypes/SkillType'

registerEnumType(AbilityScoreEnum, {
  name: 'AbilityScoreEnum',
})

registerEnumType(SkillEnum, {
  name: 'SkillEnum',
})

@Resolver()
class CharacterDataResolver {
  @Query(() => AbilityScoreType, {
    description: 'Get information about an ability score',
  })
  async abilityScore(
    @Arg('abilityScore', type => AbilityScoreEnum)
    abilityScore: AbilityScoreEnum
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(
      `http://dnd5eapi.co/api/ability-scores/${abilityScore}`
    )

    return data
  }

  @Query(() => SkillType, {
    description: 'Get information about a character skill',
  })
  async skill(
    @Arg('skill', type => SkillEnum) skill: SkillEnum
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(`http://dnd5eapi.co/api/skills/${skill}`)

    return data
  }
}

export default CharacterDataResolver
