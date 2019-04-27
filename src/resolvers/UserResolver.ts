import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { IUserDoc } from '../interfaces/user'
import User from '../models/user'
import UserType from '../types/UserType'

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => UserType)
  async me(@Ctx() context: IApolloContext) {
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
}

export default UserResolver
