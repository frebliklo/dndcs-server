import bcrypt from 'bcryptjs'
import mongoose, { Document, Model, Schema } from 'mongoose'
import generateAuthToken from '../utils/generateAuthToken'
import hashPassword from '../utils/hashPassword'

type AuthToken = {
  token: string
}

export interface UserInterface extends Document {
  [key: string]: any
  name: string
  email: string
  password: string
  token: AuthToken[]
  generateAuthToken(): string
}

type UserSchema = Model<UserInterface> & {
  findByCredentials: (email: string, password: string) => UserInterface
}

const userSchema: Schema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = generateAuthToken(user._id)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// Method to find users based on credentials
userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash password before saving document
userSchema.pre<UserInterface>('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }

  next()
})

const User = mongoose.model<UserInterface, UserSchema>('User', userSchema)

export default User
