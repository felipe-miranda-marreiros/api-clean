import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const HASH_SALT = 12
const HASHED_VALUE = 'hash_value'

function makeSut(): BcryptAdapter {
  return new BcryptAdapter(HASH_SALT)
}

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve(HASHED_VALUE))
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', HASH_SALT)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe(HASHED_VALUE)
  })
  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
