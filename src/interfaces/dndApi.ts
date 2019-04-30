//  Common models
export type ListAPIResponse = {
  count: number
  results: NamedAPIResource[]
}

export type NamedAPIResource = {
  name: string
  url: string
}

export type ClassAPIResource = {
  class: string
  url: string
}

//  Ability score
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

// Skill
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

// Langauge
export enum LanguagesEnum {
  COMMON = 1,
  DWARWISH = 2,
  ELVISH = 3,
  GIANT = 4,
  GNOMISH = 5,
  GOBLIN = 6,
  HALFLING = 7,
  ORC = 8,
  ABYSSAL = 9,
  CELESTIAL = 10,
  DRACONIC = 11,
  DEEP_SPEECH = 12,
  INFERNAL = 13,
  PRIMORDIAL = 14,
  SYLVAN = 15,
  UNDERCOMMON = 16,
}

export interface ILanguage {
  _id: string
  index: number
  name: string
  type: string
  typical_speakers: string[]
  script: string
  url: string
}
