import { z } from 'zod'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDBAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { ZodAdapter } from '@/validation/adapters/zodAdapter'
import { AddAccountModel } from '@/domain'

export function makeSignUpController(): Controller {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDBAddAccount(),
      new ZodAdapter(
        z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(4)
        }) satisfies z.ZodSchema<AddAccountModel>
      ),
      makeDbAuthentication()
    )
  )
}
