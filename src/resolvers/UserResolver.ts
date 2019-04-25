import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { IUserDoc } from '../interfaces/user'
import User, { IUser } from '../models/user'
import AuthType from '../types/AuthType'
import UserType from '../types/UserType'

type SignUpRes = {
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
  async signUpWithEmail(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<SignUpRes> {
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
