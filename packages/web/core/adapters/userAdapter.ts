import { User } from 'core/entities/user';
import DBUser from 'modules/mongodb/models/dbUser.model';

export const adaptUser = (data: DBUser): User => {
  const result: User = {
    accountId: data.accountId,
    createdTimeUTC: data.createdTimeUTC,
  };
  return result;
};
