import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMongoRepository } from '@/infra'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypter-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adaptert'
import env from '@/main/config/env'

export function makeLoginController(): Controller {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtScret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const logErrorRepository = new LogMongoRepository()

  const validation = makeLoginValidation()
  const loginController = new LoginController(validation, dbAuthentication)
  return new LogControllerDecorator(loginController, logErrorRepository)
}
