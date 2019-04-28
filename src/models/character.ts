import mongoose, { Schema } from 'mongoose'
import { ICharacterDoc } from '../interfaces/character'

const characterSchema: Schema = new Schema<ICharacterDoc>(
  {
    public: {
      type: Boolean,
      default: false,
    },
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
    str: {
      type: Number,
    },
    dex: {
      type: Number,
    },
    con: {
      type: Number,
    },
    int: {
      type: Number,
    },
    wid: {
      type: Number,
    },
    cha: {
      type: Number,
    },
    maxHp: {
      type: Number,
    },
    currentHp: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Character = mongoose.model<ICharacterDoc>('Character', characterSchema)

export default Character
