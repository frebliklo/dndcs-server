import Axios, { AxiosResponse } from 'axios'
import { Arg, Int, Query, registerEnumType, Resolver } from 'type-graphql'
import {
  ClassesEnum,
  IClasses,
  ListAPIResponse,
  NamedAPIResource,
} from '../interfaces/dndApi'
import ClassType from '../types/dnd5eApiTypes/ClassType'
import FeatureType from '../types/dnd5eApiTypes/FeatureType'

registerEnumType(ClassesEnum, {
  name: 'ClassesEnum',
})

@Resolver()
class ClassesResolver {
  @Query(type => ClassType, {
    description:
      // tslint:disable-next-line:max-line-length
      `A character class is a fundamental part of the identity and nature of characters in the Dungeons & Dragons role-playing game. A character's capabilities, strengths, and weaknesses are largely defined by its class. A character's class affects a character's available skills and abilities`,
    name: 'class',
  })
  async classQuery(
    @Arg('class', type => ClassesEnum) characterClass: IClasses
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(
      `http://dnd5eapi.co/api/classes/${characterClass}`
    )

    return data
  }

  @Query(type => [ClassType], {
    description: 'List of all classes',
    name: 'classes',
  })
  async classesQuery(): Promise<AxiosResponse[]> {
    const { data }: AxiosResponse<ListAPIResponse> = await Axios.get(
      'http://dnd5eapi.co/api/classes/'
    )

    const results = await Promise.all(
      data.results.map(async (result: NamedAPIResource) => {
        const { data } = await Axios.get(result.url)

        return data
      })
    )

    return results
  }

  @Query(type => FeatureType, {
    // tslint:disable-next-line:max-line-length
    description: `When you gain a new level in a class, you get its features for that level. You don’t, however, receive the class’s starting Equipment, and a few features have additional rules when you’re multiclassing: Channel Divinity, Extra Attack, Unarmored Defense, and Spellcasting.`,
    name: 'feature',
  })
  async featureQuery(
    @Arg('index', type => Int) index: number
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(`http://dnd5eapi.co/api/features/${index}`)

    return data
  }
}

export default ClassesResolver
