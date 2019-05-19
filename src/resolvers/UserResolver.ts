import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
import UpdateUserInput from '../types/UpdateUserInput'
import UserType from '../types/UserType'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => UserType)
  async me(@Ctx() { prisma, req }: IApolloContext): Promise<User> {
    const userId = getUserId(req)

    try {
      return prisma.user({ id: userId })
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => UserType, { description: 'Find a user by id' })
  async user(
    @Arg('id') id: string,
    @Ctx() { prisma }: IApolloContext
  ): Promise<User> {
    try {
      return prisma.user({ id })
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => [UserType], { description: 'Find all users' })
  async users(@Ctx() { prisma }: IApolloContext): Promise<User[]> {
    const users = await prisma.users()

    if (!users) {
      return []
    }

    return users
  }

  @Authorized()
  @Mutation(() => UserType, {
    description: 'Updated currently authenticated user',
  })
  async updateUser(
    @Arg('data') data: UpdateUserInput,
    @Ctx() { prisma, req }: IApolloContext
  ): Promise<User> {
    const userId = getUserId(req)

    if (data.password) {
      data.password = await hashPassword(data.password)
    }

    const user = await prisma.updateUser({
      data: {
        ...data,
      },
      where: { id: userId },
    })

    return user
  }

  @Authorized()
  @Mutation(() => UserType, {
    description: 'Delete the currently authenticated user',
  })
  async deleteUser(@Ctx() { prisma, req }: IApolloContext): Promise<User> {
    const userId = getUserId(req)
    const user = await prisma.deleteUser({ id: userId })

    return user
  }
}

export default UserResolver
