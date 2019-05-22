import Axios, { AxiosResponse } from 'axios'
import { DND5EAPI } from '../../constants'
import { Character } from '../../generated/prisma-client'
import {
  FeatureFromApi,
  LevelFromApi,
  NamedAPIResource,
} from '../../interfaces/dndApi'

const getFeatureList = async (character: Character) => {
  const { dndClass, level } = character

  const levelUrl = `${DND5EAPI}/classes/${dndClass.toLowerCase()}/level/${level}`

  const { data: apiResponse }: AxiosResponse<LevelFromApi> = await Axios.get(
    levelUrl
  )

  const featureList = await Promise.all(
    apiResponse.features.map(async ({ url }: NamedAPIResource) => {
      const { data }: AxiosResponse<FeatureFromApi> = await Axios.get(url)

      return {
        index: data.index,
        name: data.name,
        description: data.desc,
      }
    })
  )

  return featureList
}

export default getFeatureList
