import mongoose, { Document, Schema } from 'mongoose'

export interface CharacterInterface extends Document {
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

const CharacterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  class: {
    type: Array,
  },
  race: {
    type: String,
  },
  strength: {
    type: Number,
  },
  dexterity: {
    type: Number,
  },
  constitution: {
    type: Number,
  },
  intelligence: {
    type: Number,
  },
  wisdom: {
    type: Number,
  },
  charisma: {
    type: Number,
  },
  maxHp: {
    type: Number,
  },
  currentHp: {
    type: Number,
  },
})

const Character = mongoose.model<CharacterInterface>(
  'Character',
  CharacterSchema
)

export default Character
