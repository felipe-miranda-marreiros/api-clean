import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-respository'
import { MongoHelper } from '../helpers/mongo-helpers'

describe('Logo Mongo Repository', () => {
  let errorColletion: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorColletion = await MongoHelper.getColletion('errors')
    await errorColletion.deleteMany()
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorColletion.countDocuments()
    const EXPECTED_LENGTH = 1
    expect(count).toBe(EXPECTED_LENGTH)
  })
})
