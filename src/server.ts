import * as bodyParser from 'body-parser'
import * as express from 'express'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on at http://localhost:${port}`)
})
