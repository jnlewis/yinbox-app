import { ObjectId } from 'mongodb';

export default interface DBChat {
  _id?: ObjectId;
  chatId: string;
  threadId: string;
  owner: string;
  participant: string;
  unreadCount: number;
  createdTimeUTC: number;
  sessionKey: string;
}
