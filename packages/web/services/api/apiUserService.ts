import { adaptUser } from 'core/adapters/userAdapter';
import { User } from 'core/entities/user';
import logger from 'core/logger/logger';
import DBUser from 'modules/mongodb/models/dbUser.model';
import { MongoDB } from 'modules/mongodb/mongodb';

export const apiSignInUser = async (
  accountId: string,
) => {
  try {
    logger.logInfo('apiSignInUser', 'Begin');

    // Skip if user already exists
    const user = await apiGetUser(accountId);
    if (user != null) {
      return;
    }

    const data: DBUser = {
      accountId,
      createdTimeUTC: new Date().getTime(),
    };

    const database = new MongoDB();
    await database.connectToDatabase();
    await database.collections.users.addUser(data);
    await database.disconnectFromDatabase();
  } catch (e) {
    logger.logError('apiSignInUser', 'Failed', e);
    return [];
  }
};

export const apiGetUser = async (accountId: string): Promise<User | null> => {
  try {
    logger.logInfo('apiGetUser', 'Begin');

    if (!accountId) {
      return null;
    }

    const database = new MongoDB();
    await database.connectToDatabase();
    const data = await database.collections.users?.getUserByAccount(accountId);
    await database.disconnectFromDatabase();

    if (data) {
      return adaptUser(data);
    } else {
      return null;
    }

  } catch (e) {
    logger.logError('apiGetUser', 'Failed', e);
    return null;
  }
};
