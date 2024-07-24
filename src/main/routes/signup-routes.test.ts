import request from 'supertest'
import app from '../config/app'
import { SUCCESS } from '@/presentation'
import { MongoHelper } from '@/infra'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountColletion = MongoHelper.getColletion('accounts')
    await accountColletion.deleteMany()
  })
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Felipe',
        email: 'felipemiranda161@gmail.com',
        password: 'asd123',
        passwordConfirmation: 'asd123'
      })
      .expect(SUCCESS)
  })
})
