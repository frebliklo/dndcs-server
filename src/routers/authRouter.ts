import { Router } from 'express'
import User from '../models/user'
import generateJwt from '../utils/generateAuthToken'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)
    const token = generateJwt(user.id)

    res.send({ token, user })
  } catch (err) {
    res.status(400).send()
  }
})

router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = generateJwt(user.id)
    res.status(201).send({ token, user })
  } catch (err) {
    res.status(400).send(err)
  }
})

export default router
