import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-controller-protocols'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helpers'

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return error
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
