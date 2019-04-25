import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import AuthType from '../entities/Auth'
import UserType from '../entities/User'
import { IUserDoc } from '../interfaces/user'
import User, { IUser } from '../models/user'

type AuthRes = {
  user: IUser
  token: string
}

@Resolver()
class UserResolver {
  @Query(() => UserType)
  async user(@Arg('id') id: string): Promise<IUserDoc> {
    return User.findById(id)
  }

  @Mutation(() => AuthType)
  async loginWithEmail(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthRes> {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    return { user, token }
  }

  @Mutation(() => AuthType)
  async signUpWithEmail(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthRes> {
    const user = new User({
      name,
      email,
      password,
    })

    await user.save()
    const token = await user.generateAuthToken()

    return { user, token }
  }
}

export default UserResolver
