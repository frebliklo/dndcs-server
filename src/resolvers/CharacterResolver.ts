import Axios from 'axios'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { ICharacterDoc } from '../interfaces/character'
import { NamedAPIResource } from '../interfaces/dndApi'
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
    const { data: classData } = await Axios.get(
      `http://dnd5eapi.co/api/classes/${data.class}`
    )
    const { data: levelData } = await Axios.get(
      `http://dnd5eapi.co/api/classes/${classData.name.toLowerCase()}/level/1`
    )

    const proficiencies = await Promise.all(
      classData.proficiencies.map(async (proficiency: NamedAPIResource) => {
        const { data } = await Axios.get(proficiency.url)

        return {
          type: data.type,
          name: data.name,
          searchIndex: data.index,
        }
      })
    )

    const features = await Promise.all(
      levelData.features.map(async (feature: NamedAPIResource) => {
        const { data } = await Axios.get(feature.url)

        return {
          name: data.name,
          searchIndex: data.index,
        }
      })
    )

    const characterData = {
      ...data,
      hitDie: {
        type: classData.hit_die,
        amount: 1,
      },
      features,
      proficiencies,
      proficiencyBonus: levelData.prof_bonus,
      proficiencyChoices: classData.proficiency_choices[0].choose,
      abilityScoreBonuse: levelData.ability_score_bonuses,
    }

    const character = new Character({
      ...characterData,
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
