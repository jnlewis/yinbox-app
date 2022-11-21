import axios from 'axios';
import { Chat } from 'core/entities/chat';
import logger from 'core/logger/logger';
import localStorage from 'core/storage/localStorage';

export const createChat = async ({
  participant,
}: { participant: string }): Promise<void> => {
  try {
    logger.logInfo('createChat', 'Begin');

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getAuthToken()}` },
    };

    await axios.post(
      '/api/chats/create',
      {
        participant,
      },
      config,
    );
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

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getAuthToken()}` },
    };

    const response = await axios.get<Chat[]>(`/api/chats/${owner}`, config);

    return response.data;
  } catch (e) {
    logger.logError('fetchChats', 'Failed', e);
    return [];
  }
};
