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
    hitDie: {
      type: {
        type: Number,
      },
      amount: {
        type: Number,
        default: 1,
      },
    },
    maxHp: {
      type: Number,
      default: 0,
    },
    currentHp: {
      type: Number,
      default: 0,
    },
    class: {
      type: Number,
      required: true,
    },
    isSubclass: {
      type: Boolean,
      default: false,
    },
    subclass: {
      type: Number,
    },
    race: {
      type: Number,
      required: true,
    },
    isSubrace: {
      type: Boolean,
      default: false,
    },
    subrace: {
      type: Number,
    },
    abilityScoreBonus: {
      type: Number,
      default: 0,
    },
    str: {
      type: Number,
      default: 0,
    },
    dex: {
      type: Number,
      default: 0,
    },
    con: {
      type: Number,
      default: 0,
    },
    int: {
      type: Number,
      default: 0,
    },
    wis: {
      type: Number,
      default: 0,
    },
    cha: {
      type: Number,
      default: 0,
    },
    proficiencyBonus: {
      type: Number,
      default: 2,
    },
    proficiencies: [
      {
        type: {
          type: String,
        },
        name: {
          type: String,
        },
        searchIndex: {
          type: Number,
        },
      },
    ],
    proficiencyChoices: {
      type: Number,
    },
    features: [
      {
        name: {
          type: String,
        },
        searchIndex: {
          type: Number,
        },
      },
    ],
    spellcasting: {
      spellcastingAbility: {
        name: {
          type: String,
        },
        searchIndex: {
          type: Number,
        },
      },
      info: [
        {
          type: String,
        },
      ],
      searchIndex: {
        type: Number,
      },
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

characterSchema.pre<ICharacterDoc>('save', async function(next) {
  const character = this

  if (character.isModified('class')) {
    console.log('Class was modified', character.level, character.class)
  }

  if (character.isModified('level')) {
    console.log('Only level changed!', character.level)
  }

  next()
})

const Character = mongoose.model<ICharacterDoc>('Character', characterSchema)

export default Character
