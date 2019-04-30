import Axios, { AxiosResponse } from 'axios'
import { Field, ObjectType, Root } from 'type-graphql'
import { ITrait, TraitRaces } from '../../interfaces/dndApi'
import getRaceUrl from '../../utils/getRaceUrl'
import RaceType from './RaceType'

@ObjectType()
class TraitType {
  @Field(type => String)
  name: string

  @Field(type => [String])
  desc: string[]

  @Field(type => [RaceType], { name: 'races' })
  async racesField(@Root() root: ITrait): Promise<AxiosResponse[]> {
    const links = root.races.map((race: TraitRaces) => {
      return getRaceUrl(race)
    })

    const results = await Promise.all(
      links.map(async (url: string) => {
        const { data } = await Axios.get(url)
        console.log(url)
        return data
      })
    )

    return results
  }
}

export default TraitType
