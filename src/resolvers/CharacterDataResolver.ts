import Axios, { AxiosResponse } from 'axios'
import { Arg, Query, registerEnumType, Resolver } from 'type-graphql'
import {
  AbilityScoreEnum,
  ILanguage,
  LanguagesEnum,
  ListAPIResponse,
  NamedAPIResource,
  SkillEnum,
} from '../interfaces/dndApi'
import AbilityScoreType from '../types/dnd5eApiTypes/AbilityScoreType'
import LanguageType from '../types/dnd5eApiTypes/LanguageType'
import SkillType from '../types/dnd5eApiTypes/SkillType'

enum LanguageTypeEnum {
  STANDARD = 'Standard',
  EXOTIC = 'Exotic',
}

enum LanguageScriptEnum {
  COMMON = 'Common',
  DWARWISH = 'Dwarvish',
  ELVISH = 'Elvish',
  INFERNAL = 'Infernal',
  CELESTIAL = 'Celestial',
  DRACONIC = 'Draconic',
  NONE = 'none',
}

registerEnumType(AbilityScoreEnum, {
  name: 'AbilityScoreEnum',
})

registerEnumType(SkillEnum, {
  name: 'SkillEnum',
})

registerEnumType(LanguagesEnum, {
  name: 'LanguageEnum',
})

registerEnumType(LanguageTypeEnum, {
  name: 'LanguageTypeEnum',
})

registerEnumType(LanguageScriptEnum, {
  name: 'LanguageScriptEnum',
})

@Resolver()
class CharacterDataResolver {
  @Query(() => AbilityScoreType, {
    // tslint:disable-next-line:max-line-length
    description: `Each of a creature’s abilities has a score, a number that defines the magnitude of that ability. An ability score is not just a measure of innate capabilities, but also encompasses a creature’s training and competence in activities related to that ability.`,
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

  @Query(() => [AbilityScoreType], {
    description: 'List of all ability scores',
  })
  async abilityScores(): Promise<AxiosResponse[]> {
    const { data }: AxiosResponse<ListAPIResponse> = await Axios.get(
      `http://dnd5eapi.co/api/ability-scores/`
    )

    const results = await Promise.all(
      data.results.map(async (result: NamedAPIResource) => {
        const { data } = await Axios.get(result.url)

        return data
      })
    )

    return results
  }

  @Query(() => SkillType, {
    // tslint:disable-next-line:max-line-length
    description: `Each ability covers a broad range of capabilities, including skills that a character or a monster can be proficient in. A skill represents a specific aspect of an ability score, and an individual’s proficiency in a skill demonstrates a focus on that aspect.`,
  })
  async skill(
    @Arg('skill', type => SkillEnum) skill: SkillEnum
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(`http://dnd5eapi.co/api/skills/${skill}`)

    return data
  }

  @Query(() => [SkillType], { description: 'List of all skills' })
  async skills(): Promise<AxiosResponse[]> {
    const { data }: AxiosResponse<ListAPIResponse> = await Axios.get(
      `http://dnd5eapi.co/api/skills/`
    )

    const results = await Promise.all(
      data.results.map(async (result: NamedAPIResource) => {
        const { data } = await Axios.get(result.url)

        return data
      })
    )

    return results
  }

  @Query(() => LanguageType, {
    description: `By virtue of your race, your character can speak, read, and write certain languages.`,
  })
  async language(
    @Arg('language', type => LanguagesEnum) language: LanguagesEnum
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(
      `http://dnd5eapi.co/api/languages/${language}`
    )

    return data
  }

  @Query(() => [LanguageType], { description: 'List of all languages' })
  async languages(
    @Arg('type', type => LanguageTypeEnum, { nullable: true })
    type: LanguageTypeEnum,
    @Arg('script', type => LanguageScriptEnum, { nullable: true })
    script: LanguageScriptEnum
  ): Promise<AxiosResponse[]> {
    const { data }: AxiosResponse<ListAPIResponse> = await Axios.get(
      'http://dnd5eapi.co/api/languages/'
    )

    const results = await Promise.all(
      data.results.map(async (result: NamedAPIResource) => {
        const { data } = await Axios.get(result.url)

        return data
      })
    )

    const typeFilter = (results: any[]) => {
      return results.filter((result: ILanguage) => result.type === type)
    }

    const scriptFilter = (results: any[]) => {
      return results.filter((result: ILanguage) => result.script === script)
    }

    if (type && script) {
      const filteredByType = typeFilter(results)
      return scriptFilter(filteredByType)
    }

    if (type) {
      return typeFilter(results)
    }

    if (script) {
      return scriptFilter(results)
    }

    return results
  }
}

export default CharacterDataResolver
