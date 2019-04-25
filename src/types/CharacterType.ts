import { Field, ID, ObjectType } from 'type-graphql'
import { IUser } from '../models/user'
import UserType from './UserType'

@ObjectType()
class CharacterType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  level: number

  @Field(type => [String])
  class: string[]

  @Field()
  race: string

  @Field()
  str: number

  @Field()
  dex: number

  @Field()
  con: number

  @Field()
  int: number

  @Field()
  wis: number

  @Field()
  cha: number

  @Field()
  maxHp: number

  @Field()
  currentHp: number

  @Field(type => UserType)
  owner: IUser
}

export default CharacterType
