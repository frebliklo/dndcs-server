import jwt from 'jsonwebtoken'

const verifyAuthToken = (token: string) =>
  jwt.verify(token, 'supersecrettemporarykey')

export default verifyAuthToken
