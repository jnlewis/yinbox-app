import { Message } from 'core/entities/message';
import { MessageTypes } from 'core/enums/messageTypes';
import DBMessage from 'modules/mongodb/models/dbMessage.model';

export const adaptMessage = (data: DBMessage): Message => {
  const result: Message = {
    messageId: data.messageId,
    threadId: data.threadId,
    sender: data.sender,
    recipient: data.recipient,
    message: data.message,
    messageType: data.messageType as MessageTypes,
    createdTimeUTC: data.createdTimeUTC,
  };
  return result;
};
