import jwt from 'jsonwebtoken'

export interface AuthToken {
  id: string
  iat: string | number
  exp: string | number
}

const verifyAuthToken = (token: string) =>
  jwt.verify(token, 'supersecrettemporarykey')

export default verifyAuthToken
