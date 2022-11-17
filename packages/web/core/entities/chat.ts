export interface Chat {
  chatId: string;
  threadId: string;
  owner: string;
  participant: string;
  unreadCount: number;
  sessionKey: string;
  createdTimeUTC: number;
}
