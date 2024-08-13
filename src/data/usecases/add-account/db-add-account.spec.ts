import { AccountModel, AddAccountModel, AddAccountRepository, Hasher } from './db-account-protocols'
import { DbAddAccount } from './db-add-account'

function makeEncrypter(): Hasher {
  class EncrypterStub implements Hasher {
    async hash(_: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const fakeAccount = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
}

function makeAddAccountRepository(): AddAccountRepository {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve(fakeAccount)
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

function makeSut(): SutTypes {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

function makeFakeAccountData(): {
  name: string
  email: string
  password: string
} {
  return {
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'hash')
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith(makeFakeAccountData().password)
  })
  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      ...makeFakeAccountData(),
      password: 'hashed_password'
    })
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual({
      ...makeFakeAccountData(),
      password: 'hashed_password',
      id: 'valid_id'
    })
  })
})
