import getProfBonusFromLevel from '../getProfBonusFromLevel'

describe('Proficiency bonus to be', () => {
  test('2 when character is level 1', () => {
    const profBonus = getProfBonusFromLevel(1)

    expect(profBonus).toBe(2)
  })

  test('2 when character is level 4', () => {
    const profBonus = getProfBonusFromLevel(4)

    expect(profBonus).toBe(2)
  })

  test('3 when character is level 5', () => {
    const profBonus = getProfBonusFromLevel(5)

    expect(profBonus).toBe(3)
  })

  test('3 when character is level 8', () => {
    const profBonus = getProfBonusFromLevel(8)

    expect(profBonus).toBe(3)
  })

  test('4 when character is level 9', () => {
    const profBonus = getProfBonusFromLevel(9)

    expect(profBonus).toBe(4)
  })

  test('5 when character is level 13', () => {
    const profBonus = getProfBonusFromLevel(13)

    expect(profBonus).toBe(5)
  })

  test('6 when character is level 17', () => {
    const profBonus = getProfBonusFromLevel(17)

    expect(profBonus).toBe(6)
  })
})
