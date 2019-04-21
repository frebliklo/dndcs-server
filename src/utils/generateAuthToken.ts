import jwt from 'jsonwebtoken'

const generateAuthToken = (id: string) =>
  jwt.sign({ id }, 'supersecrettemporarykey', { expiresIn: '1m' })

export default generateAuthToken
