import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { prisma } from '../generated/prisma-client'
import RequestWithUser from '../interfaces/requestWithUser'
import { AuthToken } from '../interfaces/user'
import auth from '../middleware/auth'
import generateAuthToken from '../utils/generateAuthToken'
import hashPassword from '../utils/hashPassword'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const users = await prisma.users({ where: { email } })
  const passwordMatch = await bcrypt.compare(password, users[0].password)

  if (!passwordMatch || users.length !== 1) {
    throw new Error('Unable to login')
  }

  try {
    const token = generateAuthToken(users[0].id)
    const updatedUser = await prisma.updateUser({
      data: {
        tokens: {
          create: {
            token,
          },
        },
      },
      where: { id: users[0].id },
    })

    res.send({ token, user: updatedUser })
  } catch (err) {
    res.status(400).send()
  }
})

router.post('/logout', auth, async (req: RequestWithUser, res) => {
  try {
    await prisma.updateUser({
      data: { tokens: { deleteMany: { token: req.token } } },
      where: { id: req.user.id },
    })

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/logout-all', auth, async (req: RequestWithUser, res) => {
  try {
    await prisma.updateUser({
      data: {
        tokens: {
          deleteMany: {},
        },
      },
      where: { id: req.user.id },
    })

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/signup', async (req, res) => {
  // const user = new User(req.body)
  const hashedPassword = await hashPassword(req.body.password)

  const user = await prisma.createUser({
    ...req.body,
    password: hashedPassword,
  })

  try {
    const token = generateAuthToken(user.id)

    const newUser = await prisma.updateUser({
      data: {
        tokens: {
          create: {
            token,
          },
        },
      },
      where: { id: user.id },
    })

    res.status(201).send({ token, user: newUser })
  } catch (err) {
    res.status(400).send(err)
  }
})

export default router
