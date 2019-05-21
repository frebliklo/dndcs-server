import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql'
import { Character, User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
import getUserId from '../utils/getUserId'
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

  @Field(type => String, { nullable: true, name: 'email' })
  emailField(
    @Root() user: User,
    @Ctx() { req }: IApolloContext
  ): string | null {
    const userId = getUserId(req)

    if (user.id === userId) {
      return user.email
    }

    return null
  }

  @Field(type => Boolean, { nullable: true, name: 'emailVerified' })
  emailVerifiedField(
    @Root() user: User,
    @Ctx() { req }: IApolloContext
  ): boolean | null {
    const userId = getUserId(req)

    if (user.id === userId) {
      return user.emailVerified
    }

    return null
  }

  @Field(type => [CharacterType])
  async characters(
    @Root() user: User,
    @Ctx() { prisma, req }: IApolloContext
  ): Promise<Character[]> {
    const userId = getUserId(req)
    const characters = await prisma.characters({
      where: { owner: { id: userId } },
    })

    if (!characters) {
      return []
    }

    const filteredCharacters = characters.filter(
      character => !!character.public || user.id === userId
    )

    return filteredCharacters
  }
}

export default UserType
