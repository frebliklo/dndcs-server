export type NamedAPIResource = {
  name: string
  url: string
}

type ClassAPIResource = {
  class: string
  url: string
}

export enum AbilityScoreEnum {
  STR = 1,
  DEX = 2,
  CON = 3,
  INT = 4,
  WIS = 5,
  CHA = 6,
}

export interface IAbilityScore {
  _id: string
  index: number
  name: string
  full_name: string
  desc: string[]
  skills: NamedAPIResource[]
  url: string
}

export enum SkillEnum {
  acrobatics = 1,
  animalHandling = 2,
  arcana = 3,
  athletics = 4,
  deception = 5,
  history = 6,
  insight = 7,
  intimidation = 8,
  investigation = 9,
  medicine = 10,
  nature = 11,
  perception = 12,
  performance = 13,
  persuasion = 14,
  religion = 15,
  sleightOfHand = 16,
  stealth = 17,
  survival = 18,
}

export interface ISkill {
  _id: string
  index: string
  name: string
  desc: string[]
  ability_score: NamedAPIResource
  url: string
}
