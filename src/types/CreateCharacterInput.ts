import { Length } from 'class-validator'
import { Field, InputType, Int, registerEnumType } from 'type-graphql'
import { ClassesEnum, RacesEnum } from '../interfaces/dndApi'

registerEnumType(ClassesEnum, {
  name: 'ClassesEnum',
})

registerEnumType(RacesEnum, {
  name: 'RacesEnum',
})

@InputType()
class CreateCharacterInput {
  @Field(type => Boolean, { nullable: true })
  public: boolean

  @Field(type => String)
  @Length(1, 255)
  name: string

  @Field(type => RacesEnum)
  race: RacesEnum

  @Field(type => ClassesEnum)
  class: ClassesEnum

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
}

export default CreateCharacterInput
