import { AddAccount, Controller, HttpRequest, HttpResponse, Validation } from './signup-controller-protocols'
import { forbbiden, ok, serverError } from '../../../helpers/http/http-helpers'
import { Authentication } from '@/domain'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return error
      }

      const { email, password, name } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbbiden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email: account.email,
        password: account.password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
