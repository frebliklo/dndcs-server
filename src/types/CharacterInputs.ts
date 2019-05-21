import { Length, Max, Min } from 'class-validator'
import { Field, InputType, Int, registerEnumType } from 'type-graphql'
import {
  ClassEnum,
  DiceEnum,
  RaceEnum,
  SubclassEnum,
  SubraceEnum,
} from '../interfaces/enums'

registerEnumType(DiceEnum, {
  name: 'DiceEnum',
  description: 'The different dice available',
})

registerEnumType(ClassEnum, {
  name: 'ClassEnum',
  description: 'Available classes',
})

registerEnumType(SubclassEnum, {
  name: 'SubclassEnum',
  description: 'Available subclasses',
})

registerEnumType(RaceEnum, {
  name: 'RaceEnum',
  description: 'Available races',
})

registerEnumType(SubraceEnum, {
  name: 'SubraceEnum',
  description: 'Available subraces',
})

@InputType()
export class CreateCharacterInput {
  @Field(type => Boolean, { nullable: true })
  public: boolean

  @Field(type => String)
  @Length(1, 255)
  name: string

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  level: number

  @Field(type => DiceEnum, { nullable: true })
  hitDie: number

  @Field(type => ClassEnum)
  dndClass: ClassEnum

  @Field(type => SubclassEnum, { nullable: true })
  dndSubclass: SubclassEnum

  @Field(type => RaceEnum)
  dndRace: RaceEnum

  @Field(type => SubraceEnum, { nullable: true })
  dndSubrace: SubraceEnum

  @Field(type => Int, { nullable: true })
  abilityScoreBonus: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  strength: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  dexterity: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  constitution: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  intelligence: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  wisdom: number

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(20)
  charisma: number
}
