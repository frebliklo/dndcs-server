import { Router } from 'express'
import Character from '../models/character'

const router = Router()

router.post('/', async (req, res) => {
  const character = new Character(req.body)

  try {
    await character.save()
    res.status(201).send(character)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const characters = await Character.find({})
    res.send(characters)
  } catch (err) {
    res.status(500).send()
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const character = await Character.findById(id)

    if (!character) {
      return res.status(404).send()
    }

    res.send(character)
  } catch (err) {
    res.status(500).send()
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'name',
    'level',
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
    'maxHp',
    'currentHp',
    'proficiencies',
  ]
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const character = await Character.findById(id)

    updates.forEach(update => (character[update] = req.body[update]))

    await character.save()

    if (!character) {
      return res.status(404).send()
    }

    res.send(character)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const character = await Character.findByIdAndDelete(id)

    if (!character) {
      return res.status(404).send()
    }

    res.send(character)
  } catch (err) {
    res.status(500).send()
  }
})

export default router
