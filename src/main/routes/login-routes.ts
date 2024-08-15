import { Router } from 'express'
import { adapteRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignUpController()))
  router.post('/login', adapteRoute(makeLoginController()))
}
