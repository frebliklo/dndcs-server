import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { ICharacterDoc } from '../interfaces/character'
import Character from '../models/character'
import CharacterType from '../types/CharacterType'
import CreateCharacterInput from '../types/CreateCharacterInput'
import UpdateCharacterInput from '../types/UpdateCharacterInput'

@Resolver()
class CharacterResolver {
  @Authorized()
  @Query(() => CharacterType)
  async character(@Arg('id') id: string): Promise<ICharacterDoc> {
    const character = await Character.findById(id)

    if (!character) {
      return null
    }

    return character
  }

  @Authorized()
  @Query(() => [CharacterType], { description: 'Find all characters' })
  async characters(@Ctx() { req }: IApolloContext): Promise<ICharacterDoc[]> {
    const characters = await Character.find({})

    if (!characters) {
      return []
    }

    const filteredCharacters = characters.filter(character => {
      return !!character.public || character.owner.toString() === req.user.id
    })

    return filteredCharacters
  }

  @Authorized()
  @Mutation(() => CharacterType, {
    description:
      'Create a new character owned by the currently authenticated user',
  })
  async createCharacter(
    @Arg('data') data: CreateCharacterInput,
    @Ctx() { req }: IApolloContext
  ): Promise<ICharacterDoc> {
    const character = new Character({
      ...data,
      owner: req.user.id,
    })

    await character.save()

    return character
  }

  @Authorized()
  @Mutation(() => CharacterType, {
    description:
      'Update a character by id owned by the currently authenticated user',
  })
  async updateCharacter(
    @Arg('id') id: string,
    @Arg('data') data: UpdateCharacterInput,
    @Ctx() { req }: IApolloContext
  ): Promise<ICharacterDoc> {
    const character = await Character.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      { ...data },
      { new: true }
    )

    return character
  }

  @Authorized()
  @Mutation(() => CharacterType, {
    description:
      'Delete a character by id owned by the currently authenticated user',
  })
  async deleteCharacter(
    @Arg('id') id: string,
    @Ctx() { req }: IApolloContext
  ): Promise<ICharacterDoc> {
    const character = await Character.findOne({ _id: id, owner: req.user.id })

    await character.remove()

    return character
  }
}

export default CharacterResolver
