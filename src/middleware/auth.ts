import { NextFunction, Response } from 'express'
import { prisma } from '../generated/prisma-client'
import AuthToken from '../interfaces/authToken'
import RequestWithUser from '../interfaces/requestWithUser'
import verifyAuthToken from '../utils/verifyAuthToken'

const auth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = verifyAuthToken(token) as AuthToken
    const [user] = await prisma.users({
      where: {
        id: decoded.id,
        tokens_some: {
          token,
        },
      },
    })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
  } catch (err) {
    res.status(401).send({ error: 'Authentication required' })
  }
}

export default auth
