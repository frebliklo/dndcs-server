import Axios, { AxiosResponse } from 'axios'
import { Arg, Query, registerEnumType, Resolver } from 'type-graphql'
import { RacesEnum } from '../interfaces/dndApi'
import RaceType from '../types/dnd5eApiTypes/RaceType'

registerEnumType(RacesEnum, {
  name: 'RacesEnum',
})

@Resolver()
class RaceResolver {
  @Query(type => RaceType, {
    description:
      'Each race grants your character ability and skill bonuses as well as racial traits',
    name: 'race',
  })
  async raceResolver(
    @Arg('race', type => RacesEnum) race: RacesEnum
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(`http://dnd5eapi.co/api/races/${race}`)

    return data
  }
}

export default RaceResolver
