import { AccountModel } from '@/domain'

export interface LoadAccountByEmailRepository {
  load(_: string): Promise<AccountModel | null>
}
