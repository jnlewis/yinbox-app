import * as mongoDB from 'mongodb';
import { ObjectId } from 'mongodb';
import DBMessage from '../models/dbMessage.model';

export class MongoDBMessages {
  private collection?: mongoDB.Collection<DBMessage>;

  constructor(collection: mongoDB.Collection<DBMessage>) {
    this.collection = collection;
  }

  async addMessage(data: DBMessage) {
    const result = await this.collection?.insertOne(data);
  }

  async getMessagesByThread(thread: string): Promise<DBMessage[] | null | undefined> {
    const query = { threadId: thread };
    const result = await this.collection?.find(query).sort({ createdTimeUTC: 1 }).toArray();
    return result;
  }

  async getMessagesSince(thread: string, timestamp: number): Promise<DBMessage[] | null | undefined> {
    const query = { threadId: thread, createdTimeUTC: { $gt: timestamp } };
    const result = await this.collection?.find(query).sort({ createdTimeUTC: 1 }).toArray();
    return result;
  }

  async deleteMessage(id: string): Promise<number> {
    const query = { _id: new ObjectId(id) };
    const result = await this.collection?.deleteOne(query);
    return result?.deletedCount || 0;
  }
}
