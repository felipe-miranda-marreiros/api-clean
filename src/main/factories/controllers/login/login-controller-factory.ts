import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'

export function makeLoginController(): Controller {
  const validation = makeLoginValidation()
  return makeLogControllerDecorator(new LoginController(validation, makeDbAuthentication()))
}
