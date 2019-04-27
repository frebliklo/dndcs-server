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
    const { user } = context.req

    if (!user) {
      return null
    }

    return user
  }

  @Authorized()
  @Query(() => UserType, { description: 'Find a user by id' })
  async user(@Arg('id') id: string): Promise<IUserDoc> {
    return User.findById(id)
  }
}

export default UserResolver
