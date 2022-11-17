import { adaptMessage } from 'core/adapters/messageAdapter';
import { Message } from 'core/entities/message';
import { Blockchains } from 'core/enums/blockchains';
import { MessageTypes } from 'core/enums/messageTypes';
import logger from 'core/logger/logger';
import DBMessage from 'modules/mongodb/models/dbMessage.model';
import { MongoDB } from 'modules/mongodb/mongodb';
import { v4 as uuidv4 } from 'uuid';

export const apiSendMessage = async (
  threadId: string,
  sender: string,
  recipient: string,
  message: string,
  messageType: MessageTypes,
) => {
  try {
    logger.logInfo('apiSendMessage', 'Begin');

    const messageId = uuidv4();

    const data: DBMessage = {
      messageId,
      threadId,
      sender,
      recipient,
      message,
      messageType,
      createdTimeUTC: new Date().getTime(),
    };

    const database = new MongoDB();
    await database.connectToDatabase();
    await database.collections.messages.addMessage(data);
    await database.disconnectFromDatabase();
  } catch (e) {
    logger.logError('apiSendMessage', 'Failed', e);
    return [];
  }
};

export const apiGetMessages = async (threadId: string): Promise<Message[]> => {
  try {
    logger.logInfo('apiGetMessages', 'Begin');

    const database = new MongoDB();
    await database.connectToDatabase();
    const data = await database.collections.messages?.getMessagesByThread(threadId);
    await database.disconnectFromDatabase();

    const result: Message[] = [];
    data?.forEach((item) => {
      result.push(adaptMessage(item));
    });

    return result;
  } catch (e) {
    logger.logError('apiGetMessages', 'Failed', e);
    return [];
  }
};

export const apiGetMessagesSince = async (threadId: string, timestamp: number): Promise<Message[]> => {
  try {
    logger.logInfo('apiGetMessagesSince', 'Begin', { threadId, timestamp });

    const database = new MongoDB();
    await database.connectToDatabase();
    const data = await database.collections.messages?.getMessagesSince(threadId, timestamp);
    await database.disconnectFromDatabase();

    const result: Message[] = [];
    data?.forEach((item) => {
      result.push(adaptMessage(item));
    });

    return result;
  } catch (e) {
    logger.logError('apiGetMessagesSince', 'Failed', e);
    return [];
  }
};
