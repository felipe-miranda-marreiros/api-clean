import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypter-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adaptert'
import { Authentication } from '@/domain'

export function makeDbAuthentication(): Authentication {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtScret)
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
