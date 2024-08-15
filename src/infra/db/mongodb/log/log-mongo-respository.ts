import { MongoHelper } from '../helpers/mongo-helpers'
import { LogErrorRepository } from '@/data'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getColletion('errors')
    errorCollection.insertOne({
      stack,
      date: Date.now()
    })
  }
}
