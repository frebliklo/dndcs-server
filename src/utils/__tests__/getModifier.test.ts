import getModifier from '../getModifier'

describe('Modifiers to be', () => {
  test('-1 when given 9', () => {
    const modifier = getModifier(9)

    expect(modifier).toBe(-1)
  })

  test('+2 when given 15', () => {
    const modifier = getModifier(15)

    expect(modifier).toBe(2)
  })

  test('0 when given no input', () => {
    const modifier = getModifier()

    expect(modifier).toBe(0)
  })
})
