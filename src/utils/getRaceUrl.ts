import { TraitRaces } from '../interfaces/dndApi'

const getRaceUrl = (race: TraitRaces): string | null => {
  switch (race.name) {
    case 'Dwarf': {
      return 'http://www.dnd5eapi.co/api/races/1'
    }
    case 'Elf': {
      return 'http://www.dnd5eapi.co/api/races/2'
    }
    case 'Halfling': {
      return 'http://www.dnd5eapi.co/api/races/3'
    }
    case 'Human': {
      return 'http://www.dnd5eapi.co/api/races/4'
    }
    case 'Dragonborn': {
      return 'http://www.dnd5eapi.co/api/races/5'
    }
    case 'Gnome': {
      return 'http://www.dnd5eapi.co/api/races/6'
    }
    case 'Half-Elf': {
      return 'http://www.dnd5eapi.co/api/races/7'
    }
    case 'Half-Orc': {
      return 'http://www.dnd5eapi.co/api/races/8'
    }
    case 'Tiefling': {
      return 'http://www.dnd5eapi.co/api/races/9'
    }
    default: {
      return null
    }
  }
}

export default getRaceUrl
