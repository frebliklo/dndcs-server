import { Request } from 'express'
import { AuthToken } from '../generated/prisma-client'
import verifyAuthToken from './verifyAuthToken'

const getUserId = (req: Request) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  const decoded = verifyAuthToken(token) as AuthToken

  if (token) {
    return decoded.id
  }

  return null
}

export default getUserId
