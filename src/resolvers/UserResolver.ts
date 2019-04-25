import { Arg, Query, Resolver } from 'type-graphql'
import { IUserDoc } from '../interfaces/user'
import User from '../models/user'
import UserType from '../types/UserType'

@Resolver()
class UserResolver {
  @Query(() => UserType)
  async user(@Arg('id') id: string): Promise<IUserDoc> {
    return User.findById(id)
  }
}

export default UserResolver
