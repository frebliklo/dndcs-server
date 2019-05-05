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
    name: 'name',
    description: 'The name of the proficiency resource',
  })
  nameField(@Root() root: IProficieny): string {
    const trimmedName = root.name.split(': ')

    if (trimmedName.length === 1) {
      return root.name
    }

    return trimmedName[1]
  }

  @Field(type => [ClassType], {
    description: 'Classes that start with this proficiency',
    nullable: true,
  })
  async classes(@Root() root: IProficieny): Promise<AxiosResponse[] | []> {
    if (root.classes) {
      const response = await Promise.all(
        root.classes.map(async (characterClass: NamedAPIResource) => {
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
