import * as mongoDB from 'mongodb';
import { ObjectId } from 'mongodb';
import DBChat from '../models/dbChat.model';

export class MongoDBChats {
  private collection?: mongoDB.Collection<DBChat>;

  constructor(collection: mongoDB.Collection<DBChat>) {
    this.collection = collection;
  }

  async addChat(data: DBChat) {
    const result = await this.collection?.insertOne(data);
  }

  async getChatById(chatId: string): Promise<DBChat | null | undefined> {
    const query = { chatId: chatId };
    const result = await this.collection?.findOne(query);
    return result;
  }

  async getChatsByOwner(owner: string): Promise<DBChat[] | null | undefined> {
    const query = { owner: owner };
    const result = await this.collection?.find(query).toArray();
    return result;
  }

  async getChatsByParticipant(participant: string): Promise<DBChat[] | null | undefined> {
    const query = { participant: participant };
    const result = await this.collection?.find(query).toArray();
    return result;
  }

  async updateChat(id: string, data: DBChat) {
    const query = { _id: new ObjectId(id) };
    // @ts-ignore
    await this.collection?.updateOne(query, { $set: data });
  }

  // async addOrUpdateNFTCollection(data: DBNFTCollection) {
  //   // const result = await this.collection?.insertOne(data);
  //   const query = {
  //     blockchain: data.blockchain,
  //     nftContractAddress: data.nftContractAddress,
  //     owner: data.owner,
  //   };
  //   await this.collection?.updateOne(query, { $set: data }, { upsert: true });
  // }
}
