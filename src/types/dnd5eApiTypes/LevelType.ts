import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import { ILevel, NamedAPIResource } from '../../interfaces/dndApi'
import ClassType from './ClassType'
import FeatureType from './FeatureType'

@ObjectType()
class LevelType {
  @Field(type => Int, {
    description: 'The number value for the current level object',
  })
  level: number

  @Field(type => Int, {
    description:
      'Total number of ability score bonuses gained, added from previous levels',
  })
  abilityScoreBonus(@Root() levelType: ILevel) {
    return levelType.ability_score_bonuses
  }

  @Field(type => Int)
  proficiencyBonus(@Root() levelType: ILevel) {
    return levelType.prof_bonus
  }

  @Field(type => ClassType, { name: 'class' })
  async classField(@Root() levelType: ILevel): Promise<AxiosResponse> {
    const { data } = await Axios.get(levelType.class.url)

    return data
  }

  @Field(type => [FeatureType], {
    description: 'Features automatically gained by players at this level',
    name: 'features',
  })
  async featuresField(@Root() root: ILevel): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.features.map(async (el: NamedAPIResource) => {
        const { data } = await Axios.get(el.url)

        return data
      })
    )
    return results
  }
}

export default LevelType
