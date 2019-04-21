import { Request } from 'express'
import { IUserDoc } from './user'

// tslint:disable-next-line:interface-name
interface RequestWithUser extends Request {
  user: IUserDoc
}

export default RequestWithUser
