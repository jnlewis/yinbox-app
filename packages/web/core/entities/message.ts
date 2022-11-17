import { MessageTypes } from "core/enums/messageTypes";

export interface Message {
  messageId?: string;
  threadId?: string;
  sender?: string;
  recipient?: string;
  message?: string;
  messageType?: MessageTypes;
  createdTimeUTC?: number;
}
