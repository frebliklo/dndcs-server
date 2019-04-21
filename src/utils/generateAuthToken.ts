import jwt from 'jsonwebtoken'

const generateAuthToken = (id: string) =>
  jwt.sign({ id }, 'supersecrettemporarykey', { expiresIn: '30 days' })

export default generateAuthToken
