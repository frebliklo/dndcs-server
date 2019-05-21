import bcrypt from 'bcryptjs'
import {
  Character,
  ClassEnum,
  prisma,
  RaceEnum,
  User,
} from '../../generated/prisma-client'
import generateAuthToken from '../../utils/generateAuthToken'

interface TestUser {
  input: {
    name: string
    email: string
    emailVerified?: boolean
    password: string
  }
  user?: User
}

interface TestAuthUser extends TestUser {
  token?: string
}

interface TestCharacter {
  input: {
    name: string
    hitDie: number
    dndClass: ClassEnum
    dndRace: RaceEnum
  }
  character: Character
}

export const testAuthUser: TestAuthUser = {
  input: {
    name: 'Jane',
    email: 'jane@example.com',
    emailVerified: true,
    password: bcrypt.hashSync('rødgrødmedfløde'),
  },
  user: undefined,
  token: undefined,
}

export const testUser: TestUser = {
  input: {
    name: 'John',
    email: 'john@doe.com',
    password: bcrypt.hashSync('test1234'),
  },
  user: undefined,
}

export const testCharacter: TestCharacter = {
  input: {
    name: 'Arya',
    hitDie: 8,
    dndClass: 'ROGUE',
    dndRace: 'HUMAN',
  },
  character: undefined,
}

const seed = async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyCharacters()

  testAuthUser.user = await prisma.createUser({
    ...testAuthUser.input,
  })

  testAuthUser.token = generateAuthToken(testAuthUser.user.id)

  testUser.user = await prisma.createUser({
    ...testUser.input,
  })

  testCharacter.character = await prisma.createCharacter({
    ...testCharacter.input,
    owner: { connect: { id: testAuthUser.user.id } },
  })
}

export default seed
