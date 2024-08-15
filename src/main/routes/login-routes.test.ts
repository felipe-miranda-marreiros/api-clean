import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import app from '../config/app'
import { SUCCESS, UNAUTHORIZED } from '@/presentation'
import { MongoHelper } from '@/infra'

let accountColletion: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletion = await MongoHelper.getColletion('accounts')
    await accountColletion.deleteMany()
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const SALT = 12
      await accountColletion.insertOne({
        name: 'Felipe',
        email: 'felipemiranda161@gmail.com',
        password: await hash('password', SALT)
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'felipemiranda161@gmail.com',
          password: 'password'
        })
        .expect(SUCCESS)
    })
    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'felipemiranda161@gmail.com',
          password: 'password'
        })
        .expect(UNAUTHORIZED)
    })
  })
})
