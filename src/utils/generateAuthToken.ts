import jwt from 'jsonwebtoken'

const generateJwt = (id: string) =>
  jwt.sign({ id }, 'supersecrettemporarykey', { expiresIn: '1m' })

export default generateJwt
