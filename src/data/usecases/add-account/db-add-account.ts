import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Hasher
  private readonly addAccountRepository: AddAccountRepository

  constructor(encrypter: Hasher, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.hash(accountData.password)
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return account
  }
}
