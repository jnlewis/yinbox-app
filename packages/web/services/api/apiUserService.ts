import { adaptUser } from 'core/adapters/userAdapter';
import { JWT } from 'core/entities/jwt';
import { User } from 'core/entities/user';
import logger from 'core/logger/logger';
import DBUser from 'modules/mongodb/models/dbUser.model';
import { MongoDB } from 'modules/mongodb/mongodb';
import { generateToken } from 'modules/jwt/jwtHelper';

export const apiSignInUser = async (
  accountId: string,
  signature: string,
): Promise<JWT> => {
  try {
    logger.logInfo('apiSignInUser', 'Begin');

    // TODO: verify signature using Ed25519. 
    // Signature to be a signed message on client NEAR wallet

    // Generate JWT token
    const tokenPayload = generateToken({ accountId });
    const result: JWT = {
      token: tokenPayload,
    };

    // Create user if not already exist
    const user = await apiGetUser(accountId);
    if (user != null) {
      return result;
    }

    const data: DBUser = {
      accountId,
      createdTimeUTC: new Date().getTime(),
    };

    const database = new MongoDB();
    await database.connectToDatabase();
    await database.collections.users.addUser(data);
    await database.disconnectFromDatabase();

    return result;
  } catch (e) {
    logger.logError('apiSignInUser', 'Failed', e);
    return null;
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
