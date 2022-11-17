import { ObjectId } from 'mongodb';

export default interface DBMessage {
  _id?: ObjectId;
  messageId: string;
  threadId: string;
  sender: string;
  recipient: string;
  message: string;
  messageType: string;
  createdTimeUTC: number;
}
