import { NextFunction, Request, Response } from 'express'

const forceSSL = (req: Request, res: Response, next: NextFunction) => {
  let sslUrl

  if (
    process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https'
  ) {
    sslUrl = ['https://', req.hostname, req.url].join('')
    return res.redirect(sslUrl)
  }

  return next()
}

export default forceSSL
