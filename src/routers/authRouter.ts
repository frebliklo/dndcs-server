import { Router } from 'express'
import RequestWithUser from '../interfaces/requestWithUser'
import { AuthToken } from '../interfaces/user'
import auth from '../middleware/auth'
import User from '../models/user'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    res.send({ token, user })
  } catch (err) {
    res.status(400).send()
  }
})

router.post('/logout', auth, async (req: RequestWithUser, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token: AuthToken) => token.token !== req.token
    )

    await req.user.save()

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/logout-all', auth, async (req: RequestWithUser, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ token, user })
  } catch (err) {
    res.status(400).send(err)
  }
})

export default router
