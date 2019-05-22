import Axios, { AxiosResponse } from 'axios'
import { DND5EAPI } from '../../constants'
import { Character, Feature, prisma } from '../../generated/prisma-client'
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

  const featuresFromApi = await Promise.all(
    apiResponse.features.map(async ({ url }: NamedAPIResource) => {
      const { data }: AxiosResponse<FeatureFromApi> = await Axios.get(url)

      return data
    })
  )

  const allFeatures = await prisma.features()

  const newFeatures = featuresFromApi.map(feature => {
    if (!feature || !feature.index) {
      return null
    }

    const exists = allFeatures.find(el => el.index === feature.index)

    if (!exists) {
      return feature
    }

    return null
  })

  const featureList: Feature[] = []

  const addedFeatures = await Promise.all(
    newFeatures.map(async feature => {
      if (feature && feature.index) {
        const added = await prisma.createFeature({
          index: feature.index,
          name: feature.name,
          description: { set: feature.desc },
        })

        featureList.push(added)
        return added
      }

      return null
    })
  )

  const existingFeatures = allFeatures.map(feature => {
    if (!feature || !feature.index) {
      return null
    }

    const exists = featuresFromApi.find(el => el.index === feature.index)

    if (!!exists) {
      featureList.push(feature)
      return feature
    }
  })

  return featureList
}

export default getFeatureList
