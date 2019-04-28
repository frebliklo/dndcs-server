import { IsEmail, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class SignupInput {
  @Field()
  @Length(1, 255)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(6, 255)
  password: string
}

export default SignupInput
