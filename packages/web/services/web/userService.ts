import axios from 'axios';
import { JWT } from 'core/entities/jwt';
import { User } from 'core/entities/user';
import logger from 'core/logger/logger';
import localStorage from 'core/storage/localStorage';

export const signInUser = async ({
  accountId,
}: Pick<User, 'accountId'>): Promise<void> => {
  try {
    logger.logInfo('signInUser', 'Begin');

    if (!accountId) {
      return;
    }
    
    // TODO: sign accountId using near sdk
    const signature = accountId;

    const response = await axios.post('/api/auth/signin', {
      accountId,
      signature,
    });

    const result = response.data as JWT;
    
    // Store token in local storage
    if (result?.token !== 'undefined') {
      localStorage.storeAuthToken(result.token);
    }

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
