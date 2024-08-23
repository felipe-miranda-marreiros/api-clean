import { AuthMiddleware } from './auth-middleware'
import {
  AccessDeniedError,
  AccountModel,
  forbbiden,
  LoadAccountByToken,
  ok,
  serverError
} from './auth-midleware-protocols'

function makeFakeAccount(): AccountModel {
  return {
    email: 'valid_email@mail.com',
    id: 'valid_id',
    name: 'valid_name',
    password: 'hashed_password'
  }
}

interface FakeRequest {
  headers: {
    [x: string]: string
  }
}

function makeFakeRequest(): FakeRequest {
  return {
    headers: {
      'x-access-token': 'any_token'
    }
  }
}

function makeLoadAccountByToken(): LoadAccountByToken {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(__: string, _?: string): Promise<AccountModel | null> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

function makeSut(role?: string): SutTypes {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exist in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbbiden(new AccessDeniedError()))
  })
  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { loadAccountByTokenStub, sut } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })
  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValue(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbbiden(new AccessDeniedError()))
  })
  test('Should return 200 on LoadAccountByToken success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })
  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
