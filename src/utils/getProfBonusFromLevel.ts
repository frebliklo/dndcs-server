const getProfBonusFromLevel = (level?: number) => {
  if (level >= 5 && level < 9) {
    return 3
  } else if (level >= 9 && level < 13) {
    return 4
  } else if (level >= 13 && level < 17) {
    return 5
  } else if (level >= 17) {
    return 6
  } else {
    return 2
  }
}

export default getProfBonusFromLevel
