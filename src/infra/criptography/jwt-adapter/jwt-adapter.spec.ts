import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adaptert'

jest.mock('jsonwebtoken', () => ({
  sign: (): Promise<string> => {
    return Promise.resolve('any_token')
  }
}))

function makeSut(): JwtAdapter {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values ', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
  })
})
