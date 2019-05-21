import { Request } from 'express'
import { User } from '../generated/prisma-client'

// tslint:disable-next-line:interface-name
interface RequestWithUser extends Request {
  user: User
  token: string
}

export default RequestWithUser
