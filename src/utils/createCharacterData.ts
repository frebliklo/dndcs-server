import Axios from 'axios'

import { NamedAPIResource } from '../interfaces/dndApi'
import CreateCharacterInput from '../types/CreateCharacterInput'

const createCharacterData = async (data: CreateCharacterInput) => {
  const { data: classData } = await Axios.get(
    `http://dnd5eapi.co/api/classes/${data.class}`
  )
  const { data: levelData } = await Axios.get(
    `http://dnd5eapi.co/api/classes/${classData.name.toLowerCase()}/level/1`
  )

  const proficiencies = await Promise.all(
    classData.proficiencies.map(async (proficiency: NamedAPIResource) => {
      const { data } = await Axios.get(proficiency.url)

      return {
        type: data.type,
        name: data.name,
        searchIndex: data.index,
      }
    })
  )

  const proficiencyChoices = {
    choose: classData.proficiency_choices[0].choose,
    from: classData.proficiency_choices[0].from.map(
      (choice: NamedAPIResource) => {
        const trimmedUrl = choice.url.split('/')

        return trimmedUrl[5]
      }
    ),
  }
  console.log(proficiencyChoices)
  const features = await Promise.all(
    levelData.features.map(async (feature: NamedAPIResource) => {
      const { data } = await Axios.get(feature.url)

      if (data.name === 'Sneak Attack') {
        return {
          name: data.name,
          searchIndex: data.index,
          diceCount: levelData.class_specific.sneak_attack.dice_count,
          diceValue: levelData.class_specific.sneak_attack.dice_value,
        }
      }

      return {
        name: data.name,
        searchIndex: data.index,
      }
    })
  )

  const featureChoices = {
    choose: levelData.feature_choices.length,
    from: levelData.feature_choices.map((choice: NamedAPIResource) => {
      const trimmedUrl = choice.url.split('/')

      return trimmedUrl[5]
    }),
  }
  console.log(featureChoices)
  const characterData = {
    ...data,
    hitDie: {
      type: classData.hit_die,
      amount: 1,
    },
    features,
    featureChoices,
    proficiencies,
    proficiencyBonus: levelData.prof_bonus,
    proficiencyChoices,
    abilityScoreBonuse: levelData.ability_score_bonuses,
  }
  console.log(characterData)
  return characterData
}

export default createCharacterData
