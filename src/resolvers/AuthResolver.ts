import { Arg, Mutation, Resolver } from 'type-graphql'
import User, { IUser } from '../models/user'
import AuthType from '../types/AuthType'
import SigninInput from '../types/SigninInput'
import SignupInput from '../types/SignupInput'

type AuthRes = {
  user: IUser
  token: string
}

@Resolver()
class AuthResolver {
  @Mutation(() => AuthType)
  async loginWithEmail(@Arg('data') { email, password }: SigninInput): Promise<
    AuthRes
  > {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    return { user, token }
  }

  @Mutation(() => AuthType)
  async signUpWithEmail(@Arg('data')
  {
    name,
    email,
    password,
  }: SignupInput): Promise<AuthRes> {
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

export default AuthResolver
