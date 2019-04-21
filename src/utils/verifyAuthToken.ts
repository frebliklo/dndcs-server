import jwt from 'jsonwebtoken'

const verifyJwt = (token: string) =>
  jwt.verify(token, 'supersecrettemporarykey')

export default verifyJwt
