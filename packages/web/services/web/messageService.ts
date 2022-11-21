import axios from 'axios';
import { Config } from 'core/config/config';
import { Message } from 'core/entities/message';
import { MessageTypes } from 'core/enums/messageTypes';
import logger from 'core/logger/logger';
import { decrypt, encrypt } from 'modules/encryption/encryption';
import localStorage from 'core/storage/localStorage';

export const sendMessage = async (
  threadId: string,
  recipient: string,
  message: string,
  messageType: MessageTypes,
  sessionKey: string): Promise<void> => {
  try {
    logger.logInfo('sendMessage', 'Begin');

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getAuthToken()}` },
    };

    const response = await axios.post('/api/messages/send', {
      threadId,
      recipient,
      message: encrypt(message, sessionKey),
      messageType,
    }, config);

  } catch (e) {
    logger.logError('sendMessage', 'Failed', e);
    return null;
  }
};

export const fetchMessages = async (threadId: string, sessionKey: string): Promise<Message[]> => {
  try {
    logger.logInfo('fetchMessages', 'Begin', { threadId });

    if (!threadId) {
      return [];
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getAuthToken()}` },
    };

    const response = await axios.get<Message[]>(`/api/messages/${threadId}`, config);

    response.data.forEach(element => {
      element.message = decrypt(element.message, sessionKey)
    });
    
    return response.data;
  } catch (e) {
    logger.logError('fetchMessages', 'Failed', e);
    return [];
  }
};

export const fetchMessagesSince = async (threadId: string, timestamp: number, sessionKey: string): Promise<Message[]> => {
  try {
    logger.logInfo('fetchMessages', 'Begin', { threadId, timestamp });

    if (!threadId) {
      return [];
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getAuthToken()}` },
    };

    const response = await axios.get<Message[]>(`/api/messages/${threadId}/${timestamp}`, config);

    response.data.forEach(element => {
      element.message = decrypt(element.message, sessionKey)
    });
    
    return response.data;
  } catch (e) {
    logger.logError('fetchMessages', 'Failed', e);
    return [];
  }
};
