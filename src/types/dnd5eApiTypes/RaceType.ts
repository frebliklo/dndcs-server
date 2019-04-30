import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import { IRace, NamedAPIResource } from '../../interfaces/dndApi'
import LanguageChoiceType from './LanguageChoiceType'
import LanguageType from './LanguageType'
import ProficiencyType from './ProficiencyType'

@ObjectType()
class RaceType {
  @Field(type => Int, { description: 'The race index for shorthand searching' })
  index: number

  @Field(type => String, { description: 'The name for the race resource' })
  name: string

  @Field(type => Int, {
    description: 'Base move speed for this race (in feet per round)',
  })
  speed: number

  @Field(type => [Int], {
    description: 'Racial bonuses to each of the six ability scores',
  })
  abilityBonuses(@Root() root: IRace) {
    return root.ability_bonuses
  }

  @Field(type => String, {
    description: 'Flavor description of likely alignments this race takes',
  })
  alignment: string

  @Field(type => String, {
    description: 'Flavor description of possible ages for this race',
  })
  age: string

  @Field(type => String, { description: 'Size class of this race' })
  size: string

  @Field(type => String, {
    description: 'Flavor description of height and weight for this race',
  })
  sizeDesc(@Root() root: IRace) {
    return root.size_description
  }

  @Field(type => [ProficiencyType], {
    description: 'Starting proficiencies for all new characters of this race',
  })
  async startingProficiencies(@Root() root: IRace): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.starting_proficiencies.map(async (el: NamedAPIResource) => {
        const { data } = await Axios.get(el.url)

        return data
      })
    )

    return results
  }

  @Field(type => [LanguageType], {
    description: 'Starting languages for all new characters of this race',
    name: 'languages',
  })
  async languagesField(@Root() root: IRace): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.languages.map(async (el: NamedAPIResource) => {
        const { data } = await Axios.get(el.url)

        return data
      })
    )

    return results
  }

  @Field(type => String, {
    description: 'Flavor description of the languages this race knows',
  })
  languageDesc(@Root() root: IRace) {
    return root.language_desc
  }

  @Field(type => LanguageChoiceType, { nullable: true })
  languageOptions(@Root() root: IRace) {
    return root.language_options
  }
}

export default RaceType
