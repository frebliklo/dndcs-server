// tslint:disable:no-console
import 'cross-fetch/polyfill'
import gql from 'graphql-tag'
import { prisma } from '../../generated/prisma-client'
import getClient from '../../tests/utils/getClient'
import seed, { testAuthUser, testCharacter } from '../../tests/utils/seed'

beforeEach(async () => {
  await seed()
})

const client = getClient()

describe('Character query', () => {
  const characterQuery = gql`
    query CharacterById($id: String!) {
      character(id: $id) {
        public
        name
        dndClass
        dndRace
        proficiencyBonus
        strength
        dexterity
        owner {
          name
        }
      }
    }
  `

  it('should return correct character', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({
      query: characterQuery,
      variables: { id: testCharacter.character.id },
    })

    expect(response.data.character.name).toBe(testCharacter.character.name)
    expect(response.data.character.dndRace).toBe(
      testCharacter.character.dndRace
    )
  })

  it('should resolve owner correctly', async () => {
    const client = getClient(testAuthUser.token)

    const response = await client.query({
      query: characterQuery,
      variables: { id: testCharacter.character.id },
    })

    expect(response.data.character.owner.name).toBe(testAuthUser.user.name)
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(client.query({ query: characterQuery })).rejects.toThrow()

    console.warn = originalError
  })
})

describe('Create character mutation', () => {
  const createCharacterMutation = gql`
    mutation NewCharacter($data: CreateCharacterInput!) {
      createCharacter(data: $data) {
        id
        public
        hitDie
        name
        dndClass
        dndRace
        proficiencyBonus
        owner {
          name
        }
      }
    }
  `

  const data = {
    name: 'Mortred',
    hitDie: 'd8',
    level: 1,
    dndClass: 'ROGUE',
    dndRace: 'HALF_ELF',
  }

  it('should add new character to currently authenticated user', async () => {
    const client = getClient(testAuthUser.token)
    const response = await client.mutate({
      mutation: createCharacterMutation,
      variables: { data },
    })
    const exists = await prisma.$exists.character({
      id: response.data.createCharacter.id,
    })

    expect(exists).toBe(true)
    expect(response.data.createCharacter.name).toBe(data.name)
  }, 15000)

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(
      client.mutate({ mutation: createCharacterMutation, variables: { data } })
    ).rejects.toThrow()

    console.warn = originalError
  })
})

describe('Delete character mutation', () => {
  const deleteCharacterMutation = gql`
    mutation RemoveCharacter($id: String!) {
      deleteCharacter(id: $id) {
        name
      }
    }
  `

  it('should remove character from currently authenticated user', async () => {
    const client = getClient(testAuthUser.token)
    const response = await client.mutate({
      mutation: deleteCharacterMutation,
      variables: { id: testCharacter.character.id },
    })
    const exists = await prisma.$exists.character({
      id: testCharacter.character.id,
    })

    expect(response.data.deleteCharacter.name).toBe(testCharacter.input.name)
    expect(exists).toBe(false)
  })

  it('should throw when there is no authenticated user', async () => {
    const originalError = console.warn
    console.warn = jest.fn()

    await expect(
      client.mutate({
        mutation: deleteCharacterMutation,
        variables: { id: '7fyivvup' },
      })
    ).rejects.toThrow()

    console.warn = originalError
  })
})
