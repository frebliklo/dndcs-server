import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { ICharacterDoc } from '../interfaces/character'
import Character from '../models/character'
import CharacterType from '../types/CharacterType'

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
}

export default CharacterResolver
