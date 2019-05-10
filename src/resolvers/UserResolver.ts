import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { prisma, User } from '../generated/prisma-client'
import IApolloContext from '../interfaces/apolloContext'
import UpdateUserInput from '../types/UpdateUserInput'
import UserType from '../types/UserType'
import hashPassword from '../utils/hashPassword'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => UserType)
  async me(@Ctx() context: IApolloContext): Promise<User> {
    try {
      return prisma.user({ id: context.req.user.id })
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => UserType, { description: 'Find a user by id' })
  async user(@Arg('id') id: string): Promise<User> {
    try {
      return prisma.user({ id })
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => [UserType], { description: 'Find all users' })
  async users(): Promise<User[]> {
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
    @Ctx() context: IApolloContext
  ): Promise<User> {
    if (data.password) {
      data.password = await hashPassword(data.password)
    }

    const user = await prisma.updateUser({
      data: {
        ...data,
      },
      where: { id: context.req.user.id },
    })

    return user
  }

  @Authorized()
  @Mutation(() => UserType, {
    description: 'Delete the currently authenticated user',
  })
  async deleteUser(@Ctx() context: IApolloContext): Promise<User> {
    const user = await prisma.deleteUser({ id: context.req.user.id })

    return user
  }
}

export default UserResolver
