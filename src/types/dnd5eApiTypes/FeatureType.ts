import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import { IFeature } from '../../interfaces/dndApi'
import ClassType from './ClassType'

@ObjectType()
class FeatureType {
  @Field(type => Int)
  index: number

  @Field(type => String, { description: 'The name for this feature resource' })
  name: string

  @Field(type => Int, { description: 'The level this feature is gained' })
  level: number

  @Field(type => ClassType, {
    description: 'The class that gains this feature',
    name: 'class',
  })
  async classField(@Root() root: IFeature): Promise<AxiosResponse> {
    const { data } = await Axios.get(root.class.url)

    return data
  }

  @Field(type => [String], {
    description: 'A brief description of the feature',
  })
  desc: string[]
}

export default FeatureType
