import { Router } from 'express'
import { adapteRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adapteRoute(makeSignUpController()))
  router.post('/login', adapteRoute(makeLoginController()))
}
