import { Chat } from 'core/entities/chat';
import DBChat from 'modules/mongodb/models/dbChat.model';

export const adaptChat = (data: DBChat): Chat => {
  const result: Chat = {
    chatId: data.chatId,
    threadId: data.threadId,
    owner: data.owner,
    participant: data.participant,
    unreadCount: data.unreadCount,
    sessionKey: data.sessionKey,
    createdTimeUTC: data.createdTimeUTC,
  };
  return result;
};
