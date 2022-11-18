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
import {
  composeMessage,
  getLastMessageTimestamp,
  prepareMessagesForParticipant,
  prepareMessagesForSelf,
} from 'modules/messaging/messageHelper';
import { useInterval } from 'react-interval-hook';

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

  useInterval(() => {
    if (!isSelf) {
      fetchNewMessages();
    }
  }, 3000);

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
      const loadedMessages = prepareMessagesForParticipant(
        messagesData,
        chat.threadId,
        chat.owner,
        chat.participant,
        isSignedUp,
        isConversationApproved,
      );
      setIsConversationUnlocked(isConversationApproved);
      setMessages(loadedMessages);
    }

    if (isSelf) {
      const [messagesData] = await Promise.all([fetchMessages(chat.threadId, chat.sessionKey)]);
      setLastMessageTimestamp(getLastMessageTimestamp(messagesData));

      const loadedMessages = prepareMessagesForSelf(messagesData, chat.threadId, chat.owner);
      setIsConversationUnlocked(true);
      setMessages(loadedMessages);
    }
  };

  const fetchNewMessages = async () => {
    const newMessages = await fetchMessagesSince(
      chat.threadId,
      lastMessageTimestamp,
      chat.sessionKey,
    );
    if (newMessages && newMessages.length > 0) {
      setLastMessageTimestamp(getLastMessageTimestamp(newMessages));
      const participantMessages = newMessages.filter(item => item.sender !== chat.owner);
      setMessages([...messages, ...participantMessages]);
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

  return (
    <>
      <div className={styles.messageContainer}>
        {isLoading && <div className={styles.loadingText}>Loading conversation...</div>}
        {!isLoading &&
          messages &&
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
              return <CardInvite key={index} sender={message.sender} message={message.message} />;
            }

            if (message.messageType === MessageTypes.NFT) {
              return (
                <CardNFT
                  key={index}
                  sender={message.sender === chat.owner ? 'You' : message.sender}
                  align={message.sender === chat.owner ? 'right' : 'left'}
                  content={message.message}
                  timestamp={message.createdTimeUTC}
                />
              );
            }

            return (
              <CardMessage
                key={index}
                sender={message.sender === chat.owner ? 'You' : message.sender}
                message={message.message}
                align={message.sender === chat.owner ? 'right' : 'left'}
                timestamp={message.createdTimeUTC}
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
