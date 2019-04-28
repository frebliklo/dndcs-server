import { Length } from 'class-validator'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
class UpdateCharacterInput {
  @Field(type => Boolean, { nullable: true })
  public: boolean

  @Field(type => String, { nullable: true })
  @Length(1, 255)
  name: string

  @Field(type => String, { nullable: true })
  race: string

  @Field(type => [String], { nullable: true })
  class: string

  @Field(type => Int, { nullable: true })
  level: number

  @Field(type => Int, { nullable: true })
  str: number

  @Field(type => Int, { nullable: true })
  dex: number

  @Field(type => Int, { nullable: true })
  con: number

  @Field(type => Int, { nullable: true })
  int: number

  @Field(type => Int, { nullable: true })
  wis: number

  @Field(type => Int, { nullable: true })
  cha: number

  @Field(type => Int, { nullable: true })
  maxHp: number

  @Field(type => Int, { nullable: true })
  currentHp: number
}

export default UpdateCharacterInput
