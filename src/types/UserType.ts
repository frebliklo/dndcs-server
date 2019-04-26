import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql'
import IApolloContext from '../interfaces/apolloContext'
import { IUser } from '../models/user'
import CharacterType from './CharacterType'

@ObjectType()
class UserType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => String, { nullable: true })
  email(@Root() user: IUser, @Ctx() context: IApolloContext): string | null {
    if (user.id === context.req.user.id) {
      return user.email
    }

    return null
  }

  @Field(type => [CharacterType], { nullable: true })
  characters: CharacterType[]
}

export default UserType
