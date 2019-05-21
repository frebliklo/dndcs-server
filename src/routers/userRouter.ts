import { Router } from 'express'
import { prisma } from '../generated/prisma-client'
import RequestWithUser from '../interfaces/requestWithUser'

const router = Router()

router.get('/me', async (req: RequestWithUser, res) => {
  try {
    const user = await prisma.user({ id: req.user.id })

    res.send(user)
  } catch (err) {
    res.status(500).send()
  }
})

router.delete('/me', async (req: RequestWithUser, res) => {
  try {
    await prisma.deleteUser({ id: req.user.id })
    res.send(req.user)
  } catch (err) {
    res.status(500).send()
  }
})

export default router
