import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDBAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'

export function makeSignUpController(): Controller {
  return makeLogControllerDecorator(
    new SignUpController(makeDBAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  )
}
