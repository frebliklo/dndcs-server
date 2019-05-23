// tslint:disable:no-console
import 'cross-fetch/polyfill'
import gql from 'graphql-tag'
import { prisma, User } from '../../generated/prisma-client'
import getClient from '../../tests/utils/getClient'
import seed, {
  testAuthUser,
  testCharacter,
  testUser,
} from '../../tests/utils/seed'

beforeAll(async () => {
  await seed()
})

const client = getClient()

describe('Me query', () => {
  const meQuery = gql`
    query Me {
      me {
        id
        name
        email
        characters {
          id
          name
          dndClass
        }
      }
    }
  `

  it('should return the correct user from context', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({ query: meQuery })

    expect(response.data.me.id).toBe(testAuthUser.user.id)
    expect(response.data.me.name).toBe(testAuthUser.user.name)
    expect(response.data.me.email).toBe(testAuthUser.user.email)
  })

  it('should return character field correctly', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({ query: meQuery })

    expect(response.data.me.characters[0].name).toBe(
      testCharacter.character.name
    )
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(client.query({ query: meQuery })).rejects.toThrow()

    console.warn = originalError
  })
})

describe('User query', () => {
  const userQuery = gql`
    query UserById($id: String!) {
      user(id: $id) {
        id
        name
        email
      }
    }
  `

  it('should return a user by id', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({
      query: userQuery,
      variables: { id: testUser.user.id },
    })

    expect(response.data.user.id).toBe(testUser.user.id)
    expect(response.data.user.name).toBe(testUser.user.name)
  })

  it('should return null value in email', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({
      query: userQuery,
      variables: { id: testUser.user.id },
    })

    expect(response.data.user.email).toBe(null)
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(client.query({ query: userQuery })).rejects.toThrow()

    console.warn = originalError
  })
})

describe('Users query', () => {
  const usersQuery = gql`
    query Users {
      users {
        id
        name
        email
      }
    }
  `

  it('should return a list of users', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({ query: usersQuery })

    expect(response.data.users).toHaveLength(2)
    expect(response.data.users[0]).toHaveProperty('id')
    expect(response.data.users[0]).toHaveProperty('name')
    expect(response.data.users[0]).toHaveProperty('email')
    expect(response.data.users[1]).toHaveProperty('id')
    expect(response.data.users[1]).toHaveProperty('name')
    expect(response.data.users[1]).toHaveProperty('email')
  })

  it('should return the correct values for email', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({ query: usersQuery })

    const currentUser = response.data.users.find(
      (user: User) => user.name === testAuthUser.user.name
    )

    const otherUser = response.data.users.find(
      (user: User) => user.name === testUser.user.name
    )

    expect(currentUser.email).toBe(testAuthUser.user.email)
    expect(otherUser.email).toBe(null)
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(client.query({ query: usersQuery })).rejects.toThrow()

    console.warn = originalError
  })
})

describe('Update user mutation', () => {
  const updateUserMutation = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
      updateUser(data: $data) {
        id
        name
        email
        emailVerified
      }
    }
  `

  it('should update authenticated users name', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.mutate({
      mutation: updateUserMutation,
      variables: {
        data: {
          email: 'gunhilda@hotmail.dk',
        },
      },
    })

    expect(response.data.updateUser.name).toBe(testAuthUser.user.name)
    expect(response.data.updateUser.email).toBe('gunhilda@hotmail.dk')
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(
      client.mutate({
        mutation: updateUserMutation,
        variables: {
          data: {
            name: 'Gunner',
          },
        },
      })
    ).rejects.toThrow()

    console.warn = originalError
  })
})

describe('Delete user mutation', () => {
  const deleteUserMutation = gql`
    mutation DeleteUser {
      deleteUser {
        id
        name
      }
    }
  `

  it('should delete the currently authenticated user', async () => {
    const client = getClient(testAuthUser.token)
    const { id } = testAuthUser.user
    const response = await client.mutate({ mutation: deleteUserMutation })
    const exists = await prisma.$exists.user({ id })

    expect(response.data.deleteUser.name).toBe(testAuthUser.input.name)
    expect(exists).toBe(false)
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(
      client.mutate({
        mutation: deleteUserMutation,
      })
    ).rejects.toThrow()

    console.warn = originalError
  })
})
