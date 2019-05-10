import bcrypt from 'bcryptjs'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { prisma, User } from '../generated/prisma-client'
import AuthType from '../types/AuthType'
import SigninInput from '../types/SigninInput'
import SignupInput from '../types/SignupInput'
import generateAuthToken from '../utils/generateAuthToken'
import hashPassword from '../utils/hashPassword'

type AuthRes = {
  user: User
  token: string
}

@Resolver()
class AuthResolver {
  @Mutation(() => AuthType)
  async loginWithEmail(@Arg('data')
  {
    email,
    password,
  }: SigninInput): Promise<AuthRes | null> {
    const [user] = await prisma.users({ where: { email } })

    const passMatch = await bcrypt.compare(password, user.password)

    if (!user || !passMatch) {
      return null
    }

    const token = generateAuthToken(user.id)

    return { user, token }
  }

  @Mutation(() => AuthType)
  async signUpWithEmail(@Arg('data')
  {
    name,
    email,
    password,
  }: SignupInput): Promise<AuthRes | null> {
    const hashedPassword = await hashPassword(password)

    const user = await prisma.createUser({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateAuthToken(user.id)

    const newUser = await prisma.updateUser({
      data: {
        tokens: {
          create: {
            token,
          },
        },
      },
      where: { id: user.id },
    })

    return { user: newUser, token }
  }
}

export default AuthResolver
