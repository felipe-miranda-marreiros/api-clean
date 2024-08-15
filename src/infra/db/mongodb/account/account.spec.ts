import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helpers'

function makeSut(): AccountMongoRepository {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany()
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })
  test('Should return an account on success', async () => {
    const sut = makeSut()
    const insertedAccount = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const beforeInsertAccount = await accountCollection.findOne({ _id: insertedAccount.insertedId })
    expect(beforeInsertAccount?.accessToken).toBeFalsy()
    await sut.updateAccessToken(insertedAccount.insertedId.toString(), 'any_token')
    const account = await accountCollection.findOne({ _id: insertedAccount.insertedId })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe('any_token')
  })
})
