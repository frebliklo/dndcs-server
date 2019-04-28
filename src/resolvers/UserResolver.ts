import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { IUserDoc } from '../interfaces/user'
import User from '../models/user'
import UpdateUserInput from '../types/UpdateUserInput'
import UserType from '../types/UserType'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => UserType)
  async me(@Ctx() context: IApolloContext): Promise<IUserDoc> {
    try {
      return User.findById(context.req.user.id)
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => UserType, { description: 'Find a user by id' })
  async user(@Arg('id') id: string): Promise<IUserDoc> {
    try {
      return User.findById(id)
    } catch (error) {
      return null
    }
  }

  @Authorized()
  @Query(() => [UserType], { description: 'Find all users' })
  async users(): Promise<IUserDoc[]> {
    const users = await User.find({})

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
  ): Promise<IUserDoc> {
    const user = await User.findByIdAndUpdate(
      context.req.user.id,
      {
        ...data,
      },
      { new: true }
    )

    return user
  }

  @Authorized()
  @Mutation(() => UserType, {
    description: 'Delete the currently authenticated user',
  })
  async deleteUser(@Ctx() context: IApolloContext): Promise<IUserDoc> {
    const user = await User.findById(context.req.user.id)
    // Use remove method instead of findByIdAndDelete to cascade remove characters owned by user
    await user.remove()

    return user
  }
}

export default UserResolver
