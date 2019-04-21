import mongoose from 'mongoose'

type AuthToken = {
  token: string
}

export interface IUserDoc extends mongoose.Document {
  [key: string]: any
  name: string
  email: string
  password: string
  token: AuthToken[]
  generateAuthToken(): string
}
