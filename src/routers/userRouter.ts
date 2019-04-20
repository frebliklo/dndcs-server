import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (err) {
    res.status(500).send()
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (err) {
    res.status(500).send()
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (err) {
    res.status(500).send()
  }
})

export default router
