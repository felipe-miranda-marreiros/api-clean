import { MongoHelper } from '../helpers/mongo-helpers'
import { AddAccountRepository } from '@/data'
import { AddAccountModel, AccountModel } from '@/domain'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getColletion('accounts')
    const { insertedId } = await accountColletion.insertOne(accountData)
    const account = await accountColletion.findOne({ _id: insertedId })
    return MongoHelper.map(account)
  }
}
