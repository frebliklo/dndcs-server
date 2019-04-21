import { NextFunction, Response } from 'express'
import AuthToken from '../interfaces/authToken'
import RequestWithUser from '../interfaces/requestWithUser'
import User from '../models/user'
import verifyAuthToken from '../utils/verifyAuthToken'

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
