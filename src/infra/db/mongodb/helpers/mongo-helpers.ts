import { Collection, Document, MongoClient, WithId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
  },
  async getColletion(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
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
