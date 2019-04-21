import mongoose from 'mongoose'

export type AuthToken = {
  token: string
}

export interface IUserDoc extends mongoose.Document {
  [key: string]: any
  name: string
  email: string
  password: string
  token: AuthToken[]
}
