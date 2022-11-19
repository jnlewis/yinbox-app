import { Chat } from 'core/entities/chat';
import logger from 'core/logger/logger';
import { MongoDB } from 'modules/mongodb/mongodb';
import DBChat from 'modules/mongodb/models/dbChat.model';
import { v4 as uuidv4 } from 'uuid';
import { adaptChat } from 'core/adapters/chatAdapter';

export interface ApiCreateChatResponse {
  threadId: string
};

export const apiCreateChat = async (
  sender: string,
  recipient: string,
): Promise<ApiCreateChatResponse> => {
  try {
    logger.logInfo('apiCreateChat', 'Begin');
    if (!sender || !recipient) {
      return;
    }

    const existingChats = await apiGetChatsByOwner(sender);
    if (existingChats && existingChats.find(item => item.participant === recipient)) {
      // TODO: return to screen so the chat can be selected
      logger.logWarning('apiCreateChat', 'Chat already exist.');
      return;
    }
    
    const threadId = uuidv4();
    const sessionKey = uuidv4();

    const ownerData: DBChat = {
      chatId: uuidv4(),
      threadId,
      owner: sender,
      participant: recipient,
      unreadCount: 0,
      createdTimeUTC: new Date().getTime(),
      sessionKey,
    };

    let participantOwner: DBChat = null;
    if (sender !== recipient) {
      participantOwner = {
        chatId: uuidv4(),
        threadId,
        owner: recipient,
        participant: sender,
        unreadCount: 0,
        createdTimeUTC: new Date().getTime(),
        sessionKey,
      };
    }


    const database = new MongoDB();
    await database.connectToDatabase();
    await database.collections.chats.addChat(ownerData);
    if (participantOwner) {
      await database.collections.chats.addChat(participantOwner);
    }
    await database.disconnectFromDatabase();

    return {
      threadId
    }

  } catch (e) {
    logger.logError('apiCreateChat', 'Failed', e);
    return null;
  }
};

export const apiGetChatsByOwner = async (owner: string): Promise<Chat[]> => {
  try {
    logger.logInfo('getChatsByOwner', 'Begin');

    const database = new MongoDB();
    await database.connectToDatabase();
    const data = await database.collections.chats?.getChatsByOwner(owner);
    await database.disconnectFromDatabase();

    const result: Chat[] = [];
    data?.forEach((item) => {
      result.push(adaptChat(item));
    });

    return result;
  } catch (e) {
    logger.logError('getChatsByOwner', 'Failed', e);
    return [];
  }
};
