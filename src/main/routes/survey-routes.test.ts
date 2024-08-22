import request from 'supertest'
import { Collection } from 'mongodb'
import app from '../config/app'
import { NO_CONTENT } from '@/presentation'
import { MongoHelper } from '@/infra'

let surveyColletion: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyColletion = await MongoHelper.getColletion('surveys')
    await surveyColletion.deleteMany()
  })
  describe('POST /surveys', () => {
    test('Should return 204 on add survey', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(NO_CONTENT)
    })
  })
})
