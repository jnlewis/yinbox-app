import { Message } from 'core/entities/message';
import { MessageTypes } from 'core/enums/messageTypes';

export const prepareMessagesForParticipant = (
  messages: Message[],
  threadId: string,
  sender: string,
  recipient: string,
  isRecipientSignedUp: boolean,
  isConversationApproved: boolean,
) => {
  const result = [];

  // Beginning message
  result.push({
    threadId: threadId,
    recipient,
    message: `This is the beginning of your conversation with ${recipient}`,
    messageType: MessageTypes.Notice,
    createdTimeUTC: new Date().getTime(),
  });

  // User not exist message
  if (!isRecipientSignedUp) {
    result.push({
      threadId: threadId,
      sender: 'Yinbox',
      recipient: sender,
      message: `${recipient} is not on Yinbox yet. You can still send messages but they will only receive them once they're on Yinbox.`,
      messageType: MessageTypes.Invite,
      createdTimeUTC: new Date().getTime(),
    });
  }

  // Conversation Approval
  if (!isConversationApproved) {
    result.push({
      threadId: threadId,
      sender: 'Yinbox',
      recipient: sender,
      message: `To prevent spams, Yinbox charges a one time fee of 0.5 NEAR when beginning a new conversation with anyone.`,
      messageType: MessageTypes.Approval,
      createdTimeUTC: new Date().getTime(),
    });
  }

  result.push(...messages);

  return result;
};

export const prepareMessagesForSelf = (
  messages: Message[],
  threadId: string,
  sender: string,
) => {
  const result = [];

  result.push({
    threadId: threadId,
    sender: 'Yinbox',
    recipient: sender,
    message: `This is your personal space. You can write notes here that only you can see.`,
    messageType: MessageTypes.Message,
    createdTimeUTC: new Date().getTime(),
  });
  result.push({
    threadId: threadId,
    sender: 'Yinbox',
    recipient: sender,
    message: `Don't feel like talking to yourself? Start a conversation with someone.`,
    messageType: MessageTypes.Invite,
    createdTimeUTC: new Date().getTime(),
  });

  result.push(...messages);

  return result;
};

export const composeMessage = (
  threadId: string,
  sender: string,
  recipient: string,
  content: string,
): Message => {
  content = content.trim();

  let result: Message;

  // let result: Message[] = [];
  // if (content === '/help') {
  //     result.push({
  //         threadId: threadId,
  //         sender: 'Yinbox',
  //         recipient: sender,
  //         message: `Available commands: /nft [contract-address] [token-id]`,
  //         messageType: MessageTypes.Message,
  //         createdTimeUTC: new Date().getTime(),
  //     });
  //     result.push({
  //         threadId: threadId,
  //         sender: 'Yinbox',
  //         recipient: sender,
  //         message: `Available commands: /nft [contract-address] [token-id]`,
  //         messageType: MessageTypes.Message,
  //         createdTimeUTC: new Date().getTime(),
  //     });
  // }

  // Match '/nft '
  if (content.startsWith('/nft ')) {
    const split = content.split(' ');
    const contractAddress = split?.[1];
    const tokenId = split?.[2];
    result = {
      threadId,
      sender,
      recipient,
      message: JSON.stringify({ contractAddress, tokenId }),
      messageType: MessageTypes.NFT,
      createdTimeUTC: new Date().getTime(),
    };
    return result;
  }

  result = {
    threadId,
    sender,
    recipient,
    message: content,
    messageType: MessageTypes.Message,
    createdTimeUTC: new Date().getTime(),
  };

  return result;
};

export const getLastMessageTimestamp = (messages: Message[]) => {
  if (messages && messages.length > 0) {
    return Math.max(...messages.map(item => item.createdTimeUTC));
  } else {
    return 0;
  }
}
