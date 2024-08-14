import { makeSignUpValidation } from './signup-validation'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { LogMongoRepository } from '@/infra'
import { BcryptAdapter } from '@/infra/criptography/bcrypter-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '@/main/decorators/log'
import { SignUpController } from '@/presentation/controllers/signup/signup'
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
