import React, { useEffect, useState } from 'react';
import styles from './MessageFeed.module.scss';
import MessageInput from 'components/MessageInput/MessageInput';
import { Chat } from 'core/entities/chat';
import { Message } from 'core/entities/message';
import { fetchMessages, fetchMessagesSince, sendMessage } from 'services/web/messageService';
import { MessageTypes } from 'core/enums/messageTypes';
import CardMessage from './Cards/CardMessage';
import CardNotice from './Cards/CardNotice';
import CardApproval from './Cards/CardApproval';
import YinboxContract from 'modules/yinboxContract/yinboxContract';
import { fetchUser } from 'services/web/userService';
import CardInvite from './Cards/CardInvite';
import CardNFT from './Cards/CardNFT';
import { composeMessage, getLastMessageTimestamp, prepareMessagesForParticipant, prepareMessagesForSelf } from 'modules/messaging/messageHelper';

interface MessageFeedProps {
  chat?: Chat;
  isSelf: boolean;
}

const MessageFeed = ({ chat, isSelf }: MessageFeedProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>();
  const [isConversationUnlocked, setIsConversationUnlocked] = useState<boolean>();
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>();

  useEffect(() => {
    init();
  }, [chat.threadId]);

  useEffect(() => {
  }, []);

  const init = async () => {
    console.log(`MessageFeed:init`);
    setIsLoading(true);
    await loadThread();
    setIsLoading(false);
  };

  const loadThread = async () => {
    console.log(`MessageFeed:loadThread`);

    if (!isSelf) {
      const [messagesData, recipientUserData, conversationData] = await Promise.all([
        fetchMessages(chat.threadId, chat.sessionKey),
        fetchUser(chat.participant),
        YinboxContract.getConversation(chat.owner, chat.participant),
      ]);
      
      setLastMessageTimestamp(getLastMessageTimestamp(messagesData));

      const isSignedUp = recipientUserData !== null;
      const isConversationApproved = conversationData !== null;
      const loadedMessages = prepareMessagesForParticipant(messagesData, chat.threadId, chat.owner, chat.participant, isSignedUp, isConversationApproved);
      setIsConversationUnlocked(isConversationApproved);
      setMessages(loadedMessages);
    }

    if (isSelf) {
      const [messagesData] = await Promise.all([
        fetchMessages(chat.threadId, chat.sessionKey),
      ]);
      setLastMessageTimestamp(getLastMessageTimestamp(messagesData));

      const loadedMessages = prepareMessagesForSelf(messagesData, chat.threadId, chat.owner);
      setIsConversationUnlocked(true);
      setMessages(loadedMessages);
    }
  };

  const handleSend = async (message: string) => {

    const newMessage = composeMessage(chat.threadId, chat.owner, chat.participant, message);
    
    setMessages([...messages, newMessage]);

    await sendMessage(
      newMessage.threadId,
      newMessage.sender,
      newMessage.recipient,
      newMessage.message,
      newMessage.messageType,
      chat.sessionKey,
    );
  };

  const handleApproveConversation = async () => {
    await YinboxContract.createConversation(chat.participant);
  };

  const fetchNewMessages = async () => {
    console.log(`fetchNewMessages`);
    const newMessages = await fetchMessagesSince(chat.threadId, lastMessageTimestamp, chat.sessionKey);
  }

  return (
    <>
      <div className={styles.messageContainer}>
          <a onClick={() => fetchNewMessages()}>fetch new</a>
        {isLoading && <div>loading...</div>}
        {!isLoading && messages &&
          messages.map((message, index) => {
            if (message.messageType === MessageTypes.Notice) {
              return <CardNotice key={index} message={message.message} />;
            }

            if (message.messageType === MessageTypes.Approval) {
              return (
                <CardApproval
                  key={index}
                  sender={message.sender}
                  message={message.message}
                  onApproveClick={() => handleApproveConversation()}
                />
              );
            }

            if (message.messageType === MessageTypes.Invite) {
              return (
                <CardInvite
                  key={index}
                  sender={message.sender}
                  message={message.message}
                />
              );
            }

            if (message.messageType === MessageTypes.NFT) {
              return (
                <CardNFT
                  key={index}
                  sender={message.sender === chat.owner ? 'You' : message.sender}
                  align={message.sender === chat.owner ? 'right' : 'left'}
                  content={message.message}
                />
              );
            }

            return (
              <CardMessage
                key={index}
                sender={message.sender === chat.owner ? 'You' : message.sender}
                message={message.message}
                align={message.sender === chat.owner ? 'right' : 'left'}
              />
            );
          })}
      </div>
      {!isLoading && (
        <MessageInput
          recipientName={chat.participant}
          disabled={!isConversationUnlocked}
          onSend={(message: string) => handleSend(message)}
        />
      )}
    </>
  );
};

export default MessageFeed;
