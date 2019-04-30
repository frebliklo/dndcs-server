// Shared values for most responses
interface IDnDApiResponse {
  _id: string
  index: number
  url: string
}

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

export type ChoiceAPIResource = {
  choose: number
  type: string
  from: NamedAPIResource[]
}

export type DescriptionAPIResource = {
  name: string
  desc: string[]
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

export interface ISkill extends IDnDApiResponse {
  name: string
  desc: string[]
  ability_score: NamedAPIResource
}

// Procifincy
export interface IProficieny extends IDnDApiResponse {
  type: string
  name: string
  classes?: NamedAPIResource[]
  races?: NamedAPIResource[]
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

export interface ILanguage extends IDnDApiResponse {
  name: string
  type: string
  typical_speakers: string[]
  script: string
}

// Classes
export enum ClassesEnum {
  BARBARIAN = 1,
  BARD = 2,
  CLERIC = 3,
  DRUID = 4,
  FIGHTER = 5,
  MONK = 6,
  PALADIN = 7,
  RANGER = 8,
  ROGUE = 9,
  SORCERER = 10,
  WARLOCK = 11,
  WIZARD = 12,
}

export interface IClasses extends IDnDApiResponse {
  name: string
  hit_die: number
  proficiency_choices: ChoiceAPIResource[]
  proficiencies: NamedAPIResource[]
  saving_throws: NamedAPIResource[]
  starting_equipment: ClassAPIResource[]
  class_levels: number[]
  subclasses: NamedAPIResource[]
  spellcasting?: ClassAPIResource
}

// Features
export interface IFeature extends IDnDApiResponse {
  name: string
  level: number
  class: NamedAPIResource
  subclass?: NamedAPIResource
  desc: string[]
}

// Spellcating
export interface ISpellCasting extends IDnDApiResponse {
  spellcasting_ability: NamedAPIResource
  info: DescriptionAPIResource[]
  class: NamedAPIResource
}

// Levels
export interface ILevel extends IDnDApiResponse {
  level: number
  ability_score_bonuses: number
  prof_bonus: number
  class_specific: ClassSpecific
  feature_choices: NamedAPIResource[]
  features: NamedAPIResource[]
  spellcasting?: ILevelSpellcasting
  class: NamedAPIResource
}

export interface ILevelSpellcasting {
  cantrips_known: number
  spells_known: number
  spell_slots_level_1: number
  spell_slots_level_2: number
  spell_slots_level_3: number
  spell_slots_level_4: number
  spell_slots_level_5: number
  spell_slots_level_6?: number
  spell_slots_level_7?: number
  spell_slots_level_8?: number
  spell_slots_level_9?: number
}
// tslint:disable-next-line:max-line-length
// Look at this when getting to using the level specific stuff: https://www.typescriptlang.org/docs/handbook/advanced-types.html
type ClassSpecific =
  | IBarbarianClassSpecific
  | IBardClassSpecific
  | IClericClassSpecific
  | IDruidClassSpecific
  | IFighterClassSpecific
  | IMonkClassSpecific
  | IPaladinClassSpecific
  | IRangerClassSpecific
  | IRogueClassSpecific
  | ISorcererClassSpecific
  | IWarlockClassSpecific
  | IWizardClassSpecific

interface IBarbarianClassSpecific {
  rage_count: number
  rage_damage_bonus: number
  brutal_critical_dice: number
}

interface IBardClassSpecific {
  bardic_inspiration_die: number
  song_of_rest_die: number
  magical_secrets_max_5: number
  magical_secrets_max_7: number
  magical_secrets_max_9: number
}

interface IClericClassSpecific {
  channel_divinity_charges: number
  destroy_undead_cr: number
}

interface IDruidClassSpecific {
  wild_shape_max_cr: number
  wild_shape_swim: string
  wild_shape_fly: string
}

interface IFighterClassSpecific {
  action_surges: number
  indomitable_uses: string
  extra_attacks: string
}

interface IMonkClassSpecific {
  martial_arts: {
    dice_count: number
    dice_value: number
  }
  ki_points: string
  unarmored_movement: string
}

interface IPaladinClassSpecific {
  aura_range: number
}

interface IRangerClassSpecific {
  favored_enemies: number
  favored_terrain: string
}

interface IRogueClassSpecific {
  sneak_attack: {
    dice_count: number
    dice_value: number
  }
}

interface ICreatingSpellSlots {
  sorcery_point_cost: number
  spell_slot_level: number
}

interface ISorcererClassSpecific {
  sorcery_points: number
  metamagic_known: number
  creating_spell_slots: ICreatingSpellSlots[]
}

interface IWarlockClassSpecific {
  invocations_known: number
  mystic_arcanum_level_6: number
  mystic_arcanum_level_7: number
  mystic_arcanum_level_8: number
  mystic_arcanum_level_9: number
}

interface IWizardClassSpecific {
  arcane_recovery_levels: number
}

// Races
export enum RacesEnum {
  DWARF = 1,
  ELF = 2,
  HALFLING = 3,
  HUMAN = 4,
  DRAGONBORN = 5,
  GNOME = 6,
  HALF_ELF = 7,
  HALF_ORC = 8,
  TIEFLING = 9,
}

export interface IRace extends IDnDApiResponse {
  name: string
  speed: number
  ability_bonuses: number[]
  alignment: string
  age: string
  size: string
  size_description: string
  starting_proficiencies: NamedAPIResource[]
  languages: NamedAPIResource[]
  language_desc: string
  language_options: ChoiceAPIResource
  traits: NamedAPIResource[]
  subraces: NamedAPIResource[]
}

export interface ISubrace extends IDnDApiResponse {
  name: string
  race: NamedAPIResource
  desc: string
  ability_bonuses: number[]
  starting_proficiencies: NamedAPIResource[]
  languages: NamedAPIResource[]
  traits: NamedAPIResource[]
}

type TraitRaces = {
  name: string
}

export interface ITrait extends IDnDApiResponse {
  races: TraitRaces[]
  name: string
  desc: string[]
}
