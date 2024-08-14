import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const HASH_SALT = 12
const HASHED_VALUE = 'hash_value'

function makeSut(): BcryptAdapter {
  return new BcryptAdapter(HASH_SALT)
}

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve(HASHED_VALUE)),
  compare: jest.fn(() => Promise.resolve(true))
}))

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', HASH_SALT)
  })
  test('Should return a valid hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe(HASHED_VALUE)
  })
  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.hash('any_value')
    expect(promise).rejects.toThrow()
  })
  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })
  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.compare('any_value', 'any_hash')
    expect(promise).rejects.toThrow()
  })
})
