import Axios, { AxiosResponse } from 'axios'
import { Field, ObjectType, Root } from 'type-graphql'
import { IProficieny, NamedAPIResource } from '../../interfaces/dndApi'
import ClassType from './ClassType'

@ObjectType()
class ProficiencyType {
  @Field(type => String, {
    description: 'The general category of the proficiency',
  })
  type: string

  @Field(type => String, {
    description: 'The name of the proficiency resource',
  })
  name: string

  @Field(type => [ClassType], {
    description: 'Classes that start with this proficiency',
    nullable: true,
  })
  async classes(
    @Root() proficiency: IProficieny
  ): Promise<AxiosResponse[] | []> {
    if (proficiency.classes) {
      const response = await Promise.all(
        proficiency.classes.map(async (characterClass: NamedAPIResource) => {
          const { data } = await Axios.get(characterClass.url)

          return data
        })
      )

      return response
    }

    return []
  }
}

export default ProficiencyType
