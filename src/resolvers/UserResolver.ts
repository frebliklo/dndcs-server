import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import AuthEntity from '../entities/AuthEntity'
import UserEntity from '../entities/UserEntity'
import { IUserDoc } from '../interfaces/user'
import User, { IUser } from '../models/user'

type SignUpRes = {
  user: IUser
  token: string
}

@Resolver()
class UserResolver {
  @Query(() => UserEntity)
  async user(@Arg('id') id: string): Promise<IUserDoc> {
    return User.findById(id)
  }

  @Mutation(() => AuthEntity)
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
