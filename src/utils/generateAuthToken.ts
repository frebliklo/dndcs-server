import jwt from 'jsonwebtoken'

const generateAuthToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SALT, { expiresIn: '30 days' })

export default generateAuthToken
