import { Request } from 'express'
import { IUser } from '../models/user'

// tslint:disable-next-line:interface-name
interface RequestWithUser extends Request {
  user: IUser
  token: string
}

export default RequestWithUser
