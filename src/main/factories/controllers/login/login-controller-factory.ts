import { z } from 'zod'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { ZodAdapter } from '@/validation/adapters/zodAdapter'
import { AuthenticationModel } from '@/domain'

export function makeLoginController(): Controller {
  return makeLogControllerDecorator(
    new LoginController(
      new ZodAdapter(
        z.object({
          email: z.string().email({ message: 'Email ou senha inválidos' }),
          password: z.string({ message: 'Email ou senha inválidos' }).min(2, { message: 'Email ou senha inválidos' })
        }) satisfies z.ZodSchema<AuthenticationModel>
      ),
      makeDbAuthentication()
    )
  )
}
