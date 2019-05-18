import { Ctx, Field, ID, Int, ObjectType, Root } from 'type-graphql'
import { Character, User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
import UserType from './UserType'

@ObjectType()
class CharacterType {
  @Field(type => ID)
  id: string

  @Field()
  public: boolean

  @Field()
  name: string

  @Field(type => Int)
  level: number

  @Field(type => Int)
  hitDie: number

  @Field(type => Int)
  maxHp: number

  @Field(type => Int)
  currentHp: number

  @Field()
  dndClass: string

  @Field(type => String, { nullable: true })
  dndSubclass: string

  @Field()
  dndRace: string

  @Field(type => String, { nullable: true })
  dndSubrace: string

  @Field(type => Int)
  abilityScoreBonus: number

  @Field(type => Int)
  strength: number

  @Field(type => Int)
  dexterity: number

  @Field(type => Int)
  constitution: number

  @Field(type => Int)
  intelligence: number

  @Field(type => Int)
  wisdom: number

  @Field(type => Int)
  charisma: number

  @Field(type => Int)
  proficiencyBonus: number

  @Field(type => UserType)
  async owner(
    @Root() character: Character,
    @Ctx() { prisma }: IApolloContext
  ): Promise<User> {
    const user = await prisma.character({ id: character.id }).owner()

    return user
  }

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

export default CharacterType
