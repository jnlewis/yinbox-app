import axios from 'axios';
import { Message } from 'core/entities/message';
import { User } from 'core/entities/user';
import logger from 'core/logger/logger';

export const signInUser = async ({
  accountId,
}: Pick<User, 'accountId'>): Promise<void> => {
  try {
    logger.logInfo('signInUser', 'Begin');

    if (!accountId) {
      return;
    }

    // TODO: verify sender using ed25519

    const response = await axios.post('/api/users/signin', {
      accountId,
    });

  } catch (e) {
    logger.logError('signInUser', 'Failed', e);
    return null;
  }
};

export const fetchUser = async (accountId: string): Promise<User | null> => {
  try {
    logger.logInfo('fetchUser', 'Begin');

    if (!accountId) {
      return null;
    }

    const response = await axios.get<User>(`/api/users/${accountId}`);

    return response.data;
  } catch (e) {
    logger.logError('fetchUser', 'Failed', e);
    return null;
  }
};
