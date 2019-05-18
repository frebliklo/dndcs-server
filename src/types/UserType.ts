import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql'
import { Character, User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
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
  email(@Root() user: User, @Ctx() { userId }: IApolloContext): string | null {
    if (user.id === userId) {
      return user.email
    }

    return null
  }

  @Field(type => Boolean, { nullable: true })
  emailVerified(
    @Root() user: User,
    @Ctx() { userId }: IApolloContext
  ): boolean | null {
    if (user.id === userId) {
      return user.emailVerified
    }

    return null
  }

  @Field(type => [CharacterType])
  async characters(
    @Root() user: User,
    @Ctx() { prisma, userId }: IApolloContext
  ): Promise<Character[]> {
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
