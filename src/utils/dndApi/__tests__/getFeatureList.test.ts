import { DND5EAPI } from '../../../constants'
import seed, {
  testCharacter,
  testLvl7Character,
} from '../../../tests/utils/seed'
import getFeatureList from '../getFeatureList'

beforeAll(async () => {
  await seed()
})

describe('Get list of features', () => {
  it('should create correct url for api', () => {
    const { dndClass, level } = testCharacter.character
    const url = `${DND5EAPI}/classes/${dndClass.toLowerCase()}/level/${level}`

    expect(url).toBe('http://www.dnd5eapi.co/api/classes/rogue/level/1')
  }, 30000)

  it('should correctly add features to db and return them', async () => {
    const features = await getFeatureList(testCharacter.character)

    expect(features).toHaveLength(2)
    expect(features[1]).toHaveProperty('index')
    expect(features[1]).toHaveProperty('name')
    expect(features[1]).toHaveProperty('description')
  }, 30000)

  it('should correctly return existing features from db', async () => {
    const features = await getFeatureList(testCharacter.character)

    expect(features).toHaveLength(2)
    expect(features[1]).toHaveProperty('index')
    expect(features[1]).toHaveProperty('name')
    expect(features[1]).toHaveProperty('description')
  }, 30000)

  it('should return the correct amount for a level 7 character', async () => {
    const features = await getFeatureList(testLvl7Character.character)

    expect(features).toHaveLength(9)
  })
})
