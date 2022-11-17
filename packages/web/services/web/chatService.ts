import axios from 'axios';
import { Chat } from 'core/entities/chat';
import logger from 'core/logger/logger';

export const createChat = async ({
  owner,
  participant,
}: Pick<Chat, 'owner' | 'participant'>): Promise<void> => {
  try {
    logger.logInfo('createChat', 'Begin');
    await axios.post('/api/chats/create', {
      owner,
      participant,
    });
  } catch (e) {
    logger.logError('createChat', 'Failed', e);
    return null;
  }
};

export const fetchOwnerChats = async (owner: string): Promise<Chat[]> => {
  try {
    logger.logInfo('fetchChats', 'Begin');

    if (!owner) {
      return [];
    }

    const response = await axios.get<Chat[]>(`/api/chats/${owner}`);

    return response.data;
  } catch (e) {
    logger.logError('fetchChats', 'Failed', e);
    return [];
  }
};
