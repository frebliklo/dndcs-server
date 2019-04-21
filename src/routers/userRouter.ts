import { Router } from 'express'
import RequestWithUser from '../interfaces/requestWithUser'
import User from '../models/user'

const router = Router()

router.get('/me', (req: RequestWithUser, res) => {
  res.send(req.user)
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

router.patch('/me', async (req: RequestWithUser, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdates) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]))

    await req.user.save()

    res.send(req.user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/me', async (req: RequestWithUser, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (err) {
    res.status(500).send()
  }
})

export default router
