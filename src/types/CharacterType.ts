import Axios, { AxiosResponse } from 'axios'
import { Field, ID, Int, ObjectType, Root } from 'type-graphql'
import {
  ICharacterDoc,
  ICharacterFeature,
  ICharacterProficiency,
} from '../interfaces/character'
import User, { IUser } from '../models/user'
import ClassType from './dnd5eApiTypes/ClassType'
import FeatureType from './dnd5eApiTypes/FeatureType'
import ProficiencyType from './dnd5eApiTypes/ProficiencyType'
import RaceType from './dnd5eApiTypes/RaceType'
import HitDieType from './HitDieType'
import UserType from './UserType'

@ObjectType()
class CharacterType {
  @Field()
  public: boolean

  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  name: string

  @Field(type => Int)
  level: number

  @Field(type => HitDieType, { name: 'hitDie' })
  hitDie(@Root() root: ICharacterDoc) {
    return root.hitDie
  }

  @Field(type => Int, { nullable: true })
  maxHp: number

  @Field(type => Int, { nullable: true })
  currentHp: number

  @Field(type => ClassType, { name: 'class' })
  async classField(@Root() root: ICharacterDoc): Promise<AxiosResponse> {
    const { data } = await Axios.get(
      `http://dnd5eapi.co/api/classes/${root.class}`
    )

    return data
  }

  @Field(type => RaceType, { name: 'race' })
  async raceField(@Root() root: ICharacterDoc): Promise<AxiosResponse> {
    const { data } = await Axios.get(
      `http://dnd5eapi.co/api/races/${root.race}`
    )

    return data
  }

  @Field(type => Int)
  abilityScoreBonuse: number

  @Field(type => Int)
  str: number

  @Field(type => Int)
  dex: number

  @Field(type => Int)
  con: number

  @Field(type => Int)
  int: number

  @Field(type => Int)
  wis: number

  @Field(type => Int)
  cha: number

  @Field(type => Int)
  proficiencyBonus: number

  // THIS NEEDS TO BE FIXED!!!!
  @Field(type => [ProficiencyType], { name: 'proficiencies', nullable: true })
  async proficienciesField(
    @Root() root: ICharacterDoc
  ): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.features.map(async (feature: ICharacterProficiency) => {
        const { data } = await Axios.get(
          `http://www.dnd5eapi.co/api/proficiencies/${feature.searchIndex}`
        )

        return data
      })
    )

    return results
  }

  @Field(type => Int)
  proficiencyChoices: number

  @Field(type => [FeatureType], { name: 'feature', nullable: true })
  async featureField(
    @Root() root: ICharacterDoc
  ): Promise<AxiosResponse[] | []> {
    if (root.features.length < 1) {
      return []
    }

    const results = await Promise.all(
      root.features.map(async (feature: ICharacterFeature) => {
        const { data } = await Axios.get(
          `http://dnd5eapi.co/api/features/${feature.searchIndex}`
        )

        return data
      })
    )

    return results
  }

  @Field(type => UserType)
  async owner(@Root() character: ICharacterDoc): Promise<IUser> {
    const user = await User.findById(character.owner)
    return user
  }
}

export default CharacterType
