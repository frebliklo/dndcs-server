import Axios, { AxiosResponse } from 'axios'
import { Field, ObjectType, Root } from 'type-graphql'
import { DescriptionAPIResource, ISpellCasting } from '../../interfaces/dndApi'
import AbilityScoreType from './AbilityScoreType'
import APIDescriptionType from './APIDescriptionType'
import ClassType from './ClassType'

@ObjectType()
class SpellCastingType {
  @Field(type => AbilityScoreType)
  async spellCastingAbility(
    @Root() root: ISpellCasting
  ): Promise<AxiosResponse> {
    const { data } = await Axios.get(root.spellcasting_ability.url)

    return data
  }

  @Field(type => [APIDescriptionType], { name: 'info' })
  infoField(@Root() root: ISpellCasting) {
    return root.info
  }

  @Field(type => ClassType, { name: 'class' })
  async classType(@Root() root: ISpellCasting): Promise<AxiosResponse> {
    const { data } = await Axios.get(root.class.url)

    return data
  }
}

export default SpellCastingType
