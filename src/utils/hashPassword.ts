import bcrypt from 'bcryptjs'

const hashPassword = (password: string) => bcrypt.hash(password, 8)

export default hashPassword
