import { NextFunction, Request, Response } from 'express'
import User, { UserInterface } from '../models/user'
import verifyAuthToken, { AuthToken } from '../utils/verifyAuthToken'

interface RequestWithUser extends Request {
  user: UserInterface
}

const auth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = verifyAuthToken(token) as AuthToken
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': '' })

    if (!user) {
      throw new Error()
    }

    req.user = user

    next()
  } catch (err) {
    res.status(401).send({ error: 'Authentication required' })
  }
}

export default auth
