import mongoose, { Document, Schema } from 'mongoose'
import hashPassword from '../utils/hashPassword'

export interface UserInterface extends Document {
  [key: string]: any
  name: string
  email: string
  password: string
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
})

userSchema.pre<UserInterface>('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }

  next()
})

const User = mongoose.model<UserInterface>('User', userSchema)

export default User
