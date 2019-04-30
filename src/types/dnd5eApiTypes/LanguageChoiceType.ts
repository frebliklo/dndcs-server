import Axios, { AxiosResponse } from 'axios'
import { Field, Int, ObjectType, Root } from 'type-graphql'
import { ChoiceAPIResource, NamedAPIResource } from '../../interfaces/dndApi'
import LanguageType from './LanguageType'

@ObjectType()
class LanguageChoiceType {
  @Field(type => Int, {
    description: 'The number of items to pick from the list',
  })
  choose: number

  @Field(type => String, {
    description: 'The type of the resources to choose from',
  })
  type: string

  @Field(type => [LanguageType], {
    description: 'A list of resources to choose from',
    name: 'from',
  })
  async fromList(@Root() choice: ChoiceAPIResource): Promise<AxiosResponse[]> {
    const response = Promise.all(
      choice.from.map(async (el: NamedAPIResource) => {
        const { data } = await Axios.get(el.url)

        return data
      })
    )

    return response
  }
}

export default LanguageChoiceType
