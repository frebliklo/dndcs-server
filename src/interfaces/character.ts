import mongoose, { Schema } from 'mongoose'

export interface IHitDie {
  type: number
  amount: number
}

export interface ICharacterProficiency {
  type: string
  name: string
  searchIndex: number
}

export interface ICharacterFeature {
  searchIndex: number
  name: string
}

export interface ICharacterSpellcasting {
  spellcastingAbility: {
    name: string
    searchIndex: number
  }
  info: string[]
  searchIndex: number
}

export interface ICharacterDoc extends mongoose.Document {
  [key: string]: any
  public: boolean
  name: string
  level: number
  hitDie: IHitDie
  maxHp: number
  currentHp: number
  class: number
  isSubclass: boolean
  subclass?: number
  race: number
  isSubrace: boolean
  subrace?: number
  abilityScoreBonuse: number
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
  proficiencyBonus: number
  proficiencies: ICharacterProficiency[]
  proficiencyChoices: number
  features: ICharacterFeature[]
  spellcasting?: ICharacterSpellcasting
  owner: Schema.Types.ObjectId
}
