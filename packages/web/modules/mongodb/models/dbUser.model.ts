import { ObjectId } from 'mongodb';

export default interface DBUser {
  _id?: ObjectId;
  accountId: string;
  createdTimeUTC: number;
}
