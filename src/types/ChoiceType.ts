import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import FeatureType from './dnd5eApiTypes/FeatureType'
import ProficiencyType from './dnd5eApiTypes/ProficiencyType'

interface IChoiceType {
  choose: number
  proficiencies?: number[]
  features?: number[]
}

@ObjectType()
class ChoiceType {
  @Field(type => Int)
  choose: number

  @Field(type => [ProficiencyType], { nullable: true, name: 'proficiencies' })
  async proficienciesField(
    @Root() root: IChoiceType
  ): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.proficiencies.map(async (proficiency: number) => {
        const { data } = await Axios.get(
          `http://www.dnd5eapi.co/api/proficiencies/${proficiency}`
        )

        return data
      })
    )

    if (!root.proficiencies) {
      return null
    }

    return results
  }

  @Field(type => [FeatureType], { nullable: true, name: 'features' })
  async featuresField(@Root() root: IChoiceType): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.features.map(async (feature: number) => {
        const { data } = await Axios.get(
          `http://www.dnd5eapi.co/api/features/${feature}`
        )

        return data
      })
    )

    if (!root.features) {
      return null
    }

    return results
  }
}

export default ChoiceType
