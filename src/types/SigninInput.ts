import { IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class SigninInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}

export default SigninInput
