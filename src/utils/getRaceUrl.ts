import { RaceEnum } from '../generated/prisma-client'

const getRaceUrl = (race: RaceEnum): string | null => {
  switch (race) {
    case 'DWARF': {
      return 'http://www.dnd5eapi.co/api/races/1'
    }
    case 'ELF': {
      return 'http://www.dnd5eapi.co/api/races/2'
    }
    case 'HALFLING': {
      return 'http://www.dnd5eapi.co/api/races/3'
    }
    case 'HUMAN': {
      return 'http://www.dnd5eapi.co/api/races/4'
    }
    case 'DRAGONBORN': {
      return 'http://www.dnd5eapi.co/api/races/5'
    }
    case 'GNOME': {
      return 'http://www.dnd5eapi.co/api/races/6'
    }
    case 'HALF_ELF': {
      return 'http://www.dnd5eapi.co/api/races/7'
    }
    case 'HALF_ORC': {
      return 'http://www.dnd5eapi.co/api/races/8'
    }
    case 'TIEFLING': {
      return 'http://www.dnd5eapi.co/api/races/9'
    }
    default: {
      return null
    }
  }
}

export default getRaceUrl
