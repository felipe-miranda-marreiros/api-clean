import { makeSignUpValidation } from './signup-validation-factory'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { LogMongoRepository } from '@/infra'
import { BcryptAdapter } from '@/infra/criptography/bcrypter-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export function makeSignUpController(): Controller {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
