import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql'
import { User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
import { ICharacterDoc } from '../interfaces/character'
import Character from '../models/character'
import CharacterType from './CharacterType'

@ObjectType()
class UserType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(type => String, { nullable: true })
  email(@Root() user: User, @Ctx() { req }: IApolloContext): string | null {
    if (user.id === req.user.id) {
      return user.email
    }

    return null
  }

  @Field(type => Boolean, { nullable: true })
  emailVerified(
    @Root() user: User,
    @Ctx() { req }: IApolloContext
  ): boolean | null {
    if (user.id === req.user.id) {
      return user.emailVerified
    }

    return null
  }

  @Field(type => [CharacterType])
  async characters(
    @Root() user: User,
    @Ctx() { req }: IApolloContext
  ): Promise<ICharacterDoc[]> {
    const characters = await Character.find({ owner: user.id })

    if (!characters) {
      return []
    }

    const filteredCharacters = characters.filter(
      character => !!character.public || user.id === req.user.id
    )

    return filteredCharacters
  }
}

export default UserType
