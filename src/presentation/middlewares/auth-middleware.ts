import {
  AccessDeniedError,
  forbbiden,
  HttpRequest,
  HttpResponse,
  LoadAccountByToken,
  Middleware,
  ok,
  serverError
} from './auth-midleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (!account) {
          return forbbiden(new AccessDeniedError())
        }
        return ok({ accountId: account.id })
      }
      return forbbiden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
