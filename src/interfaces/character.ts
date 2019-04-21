import mongoose from 'mongoose'

export interface ICharacterDoc extends mongoose.Document {
  [key: string]: any
  name: string
  level: number
  class?: string[]
  race?: string
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  maxHp?: number
  currentHp?: number
  proficiencies?: string[]
}
