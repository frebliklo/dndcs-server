import { NextFunction, Request, Response } from 'express'

const maintenanceMode = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(503)
    .send('Currently in maintenance mode. Please check back later.')
}

export default maintenanceMode
