import { DND5EAPI } from '../../constants'
import getRaceUrl from '../getRaceUrl'

describe('Should return url string for dnd5eapi', () => {
  test('correctly for half elf', () => {
    const url = getRaceUrl('HALF_ELF')

    expect(url).toBe(`${DND5EAPI}/races/7`)
  })

  test('correctly for human', () => {
    const url = getRaceUrl('HUMAN')

    expect(url).toBe(`${DND5EAPI}/races/4`)
  })
})
