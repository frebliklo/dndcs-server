import { Field, ID, ObjectType, Root } from 'type-graphql'
import { ICharacterDoc } from '../interfaces/character'
import { IUser } from '../models/user'
import CharacterType from './CharacterType'

@ObjectType()
class UserType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field(type => [CharacterType], { nullable: true })
  characters: CharacterType[]
}

export default UserType
