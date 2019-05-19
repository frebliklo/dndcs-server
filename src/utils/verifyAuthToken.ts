import jwt from 'jsonwebtoken'

const verifyAuthToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SALT)

export default verifyAuthToken
