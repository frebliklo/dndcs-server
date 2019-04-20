import mongoose, { Document, Schema } from 'mongoose'

export interface UserInterface extends Document {
  name: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
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

const User = mongoose.model<UserInterface>('User', UserSchema)

export default User
