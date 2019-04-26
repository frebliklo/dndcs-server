import { NextFunction, Response } from 'express'
import AuthToken from '../interfaces/authToken'
import RequestWithUser from '../interfaces/requestWithUser'
import User from '../models/user'
import verifyAuthToken from '../utils/verifyAuthToken'

const apolloAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = verifyAuthToken(token) as AuthToken
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })

    if (user) {
      req.user = user
    }

    next()
  } catch (err) {
    next()
  }
}

export default apolloAuth
