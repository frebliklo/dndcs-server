import Axios, { AxiosResponse } from 'axios'
import { Arg, Field, Int, ObjectType, Root } from 'type-graphql'
import { IClasses, NamedAPIResource } from '../../interfaces/dndApi'
import AbilityScoreType from './AbilityScoreType'
import LevelType from './LevelType'
import ProficiencyChoiceType from './ProficiencyChoiceType'
import ProficiencyType from './ProficiencyType'
import SpellCastingType from './SpellCastingType'

@ObjectType()
class ClassType {
  @Field(type => String, { description: 'The name for the class resource' })
  name: string

  @Field(type => Int, {
    description: 'The hit die of the class. (ex: 12 == 1d12)',
  })
  hitDie(@Root() classType: IClasses) {
    return classType.hit_die
  }

  @Field(type => [ProficiencyChoiceType], {
    description:
      'Starting proficiencies where the player must choose a certain number from the given list of proficiencies',
  })
  proficiencyChoices(@Root() classType: IClasses) {
    return classType.proficiency_choices
  }

  @Field(type => [ProficiencyType], {
    description:
      'Starting proficiencies all new characters of this class start with',
    name: 'proficiencies',
  })
  async proficiencyList(@Root() classType: IClasses): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      classType.proficiencies.map(async (proficiency: NamedAPIResource) => {
        const { data } = await Axios.get(proficiency.url)

        return data
      })
    )

    return results
  }

  @Field(type => [AbilityScoreType])
  async savingThrows(@Root() classType: IClasses): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      classType.saving_throws.map(async (result: NamedAPIResource) => {
        const { data } = await Axios.get(result.url)

        return data
      })
    )

    return results
  }

  @Field(type => LevelType, {
    description: 'Get information about a single level',
    name: 'level',
  })
  async singleLevel(
    @Root() classType: IClasses,
    @Arg('level', type => Int) level: number
  ): Promise<AxiosResponse> {
    const url = `http://www.dnd5eapi.co/api/classes/${classType.name.toLowerCase()}/level/${level}`
    const { data } = await Axios.get(url)

    return data
  }

  @Field(type => [LevelType], {
    description:
      'All possible levels that this class can obtain (excluding subclass-specific features)',
    name: 'levels',
  })
  async levelsList(@Root() classType: IClasses): Promise<AxiosResponse> {
    const url = `http://www.dnd5eapi.co/api/classes/${classType.name.toLowerCase()}/levels/`
    const { data } = await Axios.get(url)

    return data
  }

  @Field(type => SpellCastingType, { nullable: true, name: 'spellcasting' })
  async spellcastingField(@Root() root: IClasses): Promise<AxiosResponse> {
    if (root.spellcasting && root.spellcasting.url) {
      const { data } = await Axios.get(root.spellcasting.url)

      return data
    }

    return null
  }
}

export default ClassType
