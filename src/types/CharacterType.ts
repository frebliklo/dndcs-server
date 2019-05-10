import Axios, { AxiosResponse } from 'axios'
import { Field, ID, Int, ObjectType, Root } from 'type-graphql'
import { prisma, User } from '../generated/prisma-client'
import {
  ICharacterDoc,
  ICharacterFeature,
  ICharacterProficiency,
} from '../interfaces/character'
import CharacterFeatureType from './CharacterFeatureType'
import ChoiceType from './ChoiceType'
import ClassType from './dnd5eApiTypes/ClassType'
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
  abilityScoreBonus: number

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

  // THIS NEEDS TO BE FIXED!!!!
  @Field(type => [ProficiencyType], { name: 'proficiencies', nullable: true })
  async proficienciesField(
    @Root() root: ICharacterDoc
  ): Promise<AxiosResponse[]> {
    const results = await Promise.all(
      root.proficiencies.map(async (proficiency: ICharacterProficiency) => {
        const { data } = await Axios.get(
          `http://www.dnd5eapi.co/api/proficiencies/${proficiency.searchIndex}`
        )

        return data
      })
    )

    return results
  }

  @Field(type => Int)
  proficiencyBonus: number

  @Field(type => ChoiceType, { name: 'proficiencyChoices' })
  proficiencyChoicesField(@Root() root: ICharacterDoc) {
    return {
      choose: root.proficiencyChoices.choose,
      proficiencies: root.proficiencyChoices.from,
    }
  }

  @Field(type => [CharacterFeatureType])
  features: ICharacterFeature[]

  @Field(type => ChoiceType, { name: 'featureChoices' })
  featureChoices(@Root() root: ICharacterDoc) {
    return {
      choose: root.featureChoices.choose,
      features: root.featureChoices.from,
    }
  }

  @Field(type => UserType)
  async owner(@Root() character: ICharacterDoc): Promise<User> {
    const user = await prisma.user({ id: character.owner })

    return user
  }
}

export default CharacterType
