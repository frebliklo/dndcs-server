import { Field, ID, ObjectType, Root } from 'type-graphql'
import { ICharacterDoc } from '../interfaces/character'
import User, { IUser } from '../models/user'
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
  async owner(@Root() character: ICharacterDoc): Promise<IUser> {
    const user = await User.findById(character.owner)
    return user
  }
}

export default CharacterType
