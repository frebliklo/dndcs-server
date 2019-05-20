import ApolloBoost, { gql } from 'apollo-boost'
import 'cross-fetch/polyfill'
import { prisma } from '../../generated/prisma-client'
import seed from '../../tests/utils/seed'

const client = new ApolloBoost({
  uri: `http://localhost:${process.env.PORT}/graphql/`,
})

beforeAll(async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyCharacters()
  await seed()
})

describe('Test registering with email', () => {
  it('should create a new user', async () => {
    const signUnWithEmail = gql`
      mutation SignUp($data: SignupInput!) {
        signUpWithEmail(data: $data) {
          token
          user {
            id
            name
          }
        }
      }
    `

    const response = await client.mutate({
      mutation: signUnWithEmail,
      variables: {
        data: {
          name: 'Esther',
          email: 'tester@esther.dk',
          password: 'hemmeligtord2',
        },
      },
    })

    const exists = await prisma.$exists.user({
      id: response.data.signUpWithEmail.user.id,
    })

    expect(exists).toBe(true)
  })
})

describe('Test sign in with email', () => {
  it('should return a token and correct user when signing in', async () => {
    const loginWithEmail = gql`
      mutation SignIn($email: String!, $password: String!) {
        loginWithEmail(data: { email: $email, password: $password }) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `

    const response = await client.mutate({
      mutation: loginWithEmail,
      variables: {
        email: 'jane@example.com',
        password: 'rødgrødmedfløde',
      },
    })

    expect(response.data.loginWithEmail).toHaveProperty('token')
    expect(response.data.loginWithEmail.user.email).toBe('jane@example.com')
  })
})
