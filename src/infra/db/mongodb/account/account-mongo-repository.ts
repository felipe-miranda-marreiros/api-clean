import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { AddAccountRepository } from '@/data'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AddAccountModel, AccountModel } from '@/domain'

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository
{
  async updateAccessToken(id: string, accessToken: string): Promise<void> {
    const accountColletion = await MongoHelper.getColletion('accounts')
    await accountColletion.updateOne(
      {
        _id: ObjectId.createFromHexString(id)
      },
      {
        $set: {
          accessToken
        }
      }
    )
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountColletion = await MongoHelper.getColletion('accounts')
    const account = await accountColletion.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountColletion = await MongoHelper.getColletion('accounts')
    const { insertedId } = await accountColletion.insertOne(accountData)
    const account = await accountColletion.findOne({ _id: insertedId })
    return MongoHelper.map(account)
  }
}
