import { Field, ID, Int, ObjectType, Root } from 'type-graphql'
import { ICharacterDoc } from '../interfaces/character'
import User, { IUser } from '../models/user'
import UserType from './UserType'

@ObjectType()
class CharacterType {
  @Field()
  public: boolean

  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => Int)
  level: number

  @Field(type => [String])
  class: string[]

  @Field()
  race: string

  @Field(type => Int, { nullable: true })
  str: number

  @Field(type => Int, { nullable: true })
  dex: number

  @Field(type => Int, { nullable: true })
  con: number

  @Field(type => Int, { nullable: true })
  int: number

  @Field(type => Int, { nullable: true })
  wis: number

  @Field(type => Int, { nullable: true })
  cha: number

  @Field(type => Int, { nullable: true })
  maxHp: number

  @Field(type => Int, { nullable: true })
  currentHp: number

  @Field(type => UserType)
  async owner(@Root() character: ICharacterDoc): Promise<IUser> {
    const user = await User.findById(character.owner)
    return user
  }
}

export default CharacterType
