import { IsEmail, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class UpdateUserInput {
  @Field(type => String, { nullable: true })
  @Length(1, 255)
  name: string

  @Field(type => String, { nullable: true })
  @IsEmail()
  email: string

  @Field(type => String, { nullable: true })
  @Length(6, 255)
  password: string

  @Field(type => Boolean, { nullable: true })
  emailVerified: boolean
}

export default UpdateUserInput
