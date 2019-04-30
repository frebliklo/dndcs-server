import { Field, ObjectType, Root } from 'type-graphql'
import { ILanguage } from '../../interfaces/dndApi'

@ObjectType()
class LanguageType {
  @Field(type => String, { description: 'The name of this language resource' })
  name: string

  @Field(type => String, {
    description: 'Whether the language is standard or exotic',
  })
  type: string

  @Field(type => [String], {
    description: 'Races that tend to speak this language',
  })
  typicalSpeakers(@Root() language: ILanguage): string[] {
    return language.typical_speakers
  }

  @Field(type => String, {
    description: 'The script used for writing in this language',
  })
  script: string

  @Field(type => String, { description: 'The URL of the referenced resource' })
  url: string
}

export default LanguageType
