import mongoose, { Schema } from 'mongoose'

export interface ICharacterDoc extends mongoose.Document {
  [key: string]: any
  public: boolean
  name: string
  level: number
  class?: string[]
  race?: string
  str?: number
  dex?: number
  con?: number
  int?: number
  wis?: number
  cha?: number
  maxHp?: number
  currentHp?: number
  proficiencies?: string[]
  owner: Schema.Types.ObjectId
}
