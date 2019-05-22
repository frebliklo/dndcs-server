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
  const classString = dndClass.toLowerCase()

  const getLevelUrl = (lvl: number) =>
    `${DND5EAPI}/classes/${classString}/level/${lvl}`

  const levels: number[] = Array.apply(null, { length: level }).map(
    Number.call,
    Number
  )

  const apiResponse = await Promise.all(
    levels.map(async level => {
      const url = getLevelUrl(level + 1)
      const { data }: AxiosResponse<LevelFromApi> = await Axios.get(url)

      return data.features
    })
  )

  const featuresFromApi = await Promise.all(
    apiResponse.flat().map(async ({ url }) => {
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
