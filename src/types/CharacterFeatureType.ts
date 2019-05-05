import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import { ICharacterFeature } from '../interfaces/character'
import { IFeature } from '../interfaces/dndApi'

@ObjectType()
class CharacterFeatureType {
  @Field(type => String, { description: 'The name for this feature resource' })
  name: string

  @Field(type => Int, { description: 'The level this feature is gained' })
  level: number

  @Field(type => [String])
  async desc(@Root() root: ICharacterFeature): Promise<string[]> {
    const { data }: AxiosResponse<IFeature> = await Axios.get(
      `http://www.dnd5eapi.co/api/features/${root.searchIndex}`
    )

    return data.desc
  }

  @Field(type => Int, {
    description: 'Used specifically for the Rogue feature Sneak Attack',
    nullable: true,
  })
  diceCount: number

  @Field(type => Int, {
    description: 'Used specifically for the Rogue feature Sneak Attack',
    nullable: true,
  })
  diceValue: number
}

export default CharacterFeatureType
