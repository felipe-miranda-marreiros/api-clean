import { Collection, Document, MongoClient, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect(): Promise<void> {
    await this.client.close()
  },
  getColletion(name: string): Collection {
    return this.client.db().collection(name)
  },
  map<TModel>(colletion: WithId<Document> | null): TModel {
    if (colletion?._id) {
      return {
        ...(colletion as unknown as TModel),
        id: colletion._id.toString()
      }
    }
    return {} as TModel
  }
}
