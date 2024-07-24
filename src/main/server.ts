import dotenv from 'dotenv'
dotenv.config()
import env from './config/env'
import { MongoHelper } from '../infra'

const HOSTNAME = `http://localhost:${env.port}`

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at ${HOSTNAME}`))
  })
  .catch(console.error)
