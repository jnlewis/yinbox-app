import * as mongoDB from 'mongodb';
import DBUser from '../models/dbUser.model';

export class MongoDBUsers {
  private collection?: mongoDB.Collection<DBUser>;

  constructor(collection: mongoDB.Collection<DBUser>) {
    this.collection = collection;
  }

  async addUser(data: DBUser) {
    const result = await this.collection?.insertOne(data);
  }

  async getUserByAccount(accountId: string): Promise<DBUser | null | undefined> {
    const query = { accountId: accountId };
    const result = await this.collection?.findOne(query);
    return result;
  }
}
