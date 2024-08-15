import { DbAuthentication } from './db-authentication'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel, Authentication, AuthenticationModel } from '@/domain'

function makeFakeAccount(): AccountModel {
  return {
    email: 'any_email@mail.com',
    id: 'any_id',
    name: 'any_name',
    password: 'hashed_password'
  }
}

function makeLoadAccountByEmailRepository(): LoadAccountByEmailRepository {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(_: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

function makeAuthentication(): AuthenticationModel {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

function makeHashComparer(): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare(_: string, __: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

function makeTokenGenerator(): Encrypter {
  class TokenGeneratorStub implements Encrypter {
    async encrypt(_: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new TokenGeneratorStub()
}

function makeUpdateAccessTokenRepository(): UpdateAccessTokenRepository {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(_: string, __: string): Promise<void> {
      Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  sut: Authentication
  hashComparerStub: HashComparer
  tokenGeneratorStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

function makeSut(): SutTypes {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(makeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthentication())
    expect(promise).rejects.toThrow()
  })
  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBeNull()
  })
  test('Should call HashComparer with correct password', async () => {
    const { hashComparerStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
  test('Should throw if HashComparer throws', async () => {
    const { hashComparerStub, sut } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthentication())
    expect(promise).rejects.toThrow()
  })
  test('Should return null if HashComparer returns false', async () => {
    const { hashComparerStub, sut } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBeNull()
  })
  test('Should call TokenGenerator with correct id', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'encrypt')
    await sut.auth(makeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should throw if TokenGenerator throws', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthentication())
    expect(promise).rejects.toThrow()
  })
  test('Should return an accessToken on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeAuthentication())
    expect(accessToken).toBe('any_token')
  })
  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    const update = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(makeAuthentication())
    expect(update).toHaveBeenCalledWith('any_id', 'any_token')
  })
  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthentication())
    expect(promise).rejects.toThrow()
  })
})
