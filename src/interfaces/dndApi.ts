export interface NamedAPIResource {
  url: string
  name: string
}

export interface FeatureFromApi {
  _id: string
  index: number
  name: string
  level: number
  desc: string[]
  class: NamedAPIResource
  url: string
}

export interface LevelFromApi {
  _id: string
  index: number
  ability_score_bonuses: number
  prof_bonus: number
  feature_choices: NamedAPIResource[]
  features: NamedAPIResource[]
  class_specific: any
  class: NamedAPIResource
  url: string
}
