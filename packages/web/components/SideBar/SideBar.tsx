import NewConversationDialog from 'components/dialogs/NewConversationDialog/NewConversationDialog';
import UserDisplay from 'components/UserDisplay/UserDisplay';
import { Chat } from 'core/entities/chat';
import React, { useEffect, useState } from 'react';
import { fetchOwnerChats } from 'services/web/chatService';
import { reject } from 'lodash';

interface SideBarProps {
  isOpen: boolean;
  walletAddress: string;
  onSelectChat: (chat: Chat) => void;
}

const SideBar = ({ isOpen, walletAddress, onSelectChat }: SideBarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewConversationDialog, setShowNewConversationDialog] = useState(false);
  const [chats, setChats] = useState<Chat[]>();
  const [selectedParticipant, setSelectedParticipant] = useState<string>();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    setIsLoading(true);

    let chatsData = await fetchOwnerChats(walletAddress);

    // Order self chat to highest in list
    if (chatsData) {
      // Find self chat
      let selfChat = chatsData.find(
        (item) => item.owner === walletAddress && item.participant === walletAddress,
      );

      // Get chats that is not self
      chatsData = reject(chatsData, (item) => item.owner === walletAddress && item.participant === walletAddress);

      // Inserts self chat to the first
      if (selfChat) {
        chatsData.unshift(selfChat);
      }
    }

    setChats(chatsData);

    setIsLoading(false);
  };

  const handleNewMessage = () => {
    setShowNewConversationDialog(true);
  };

  const handleStartedConversation = async (accountId: string) => {
    setShowNewConversationDialog(false);

    await loadChats();
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedParticipant(chat.participant);
    onSelectChat(chat);
  };

  return (
    <>
      <div id="sidebar-wrapper" style={{ marginLeft: `${isOpen ? '0' : '-360px'}` }}>
        <div className="sidebar">
          <a href="/">
            <img src="/assets/yinbox/yinbox-logo-dark.svg" alt="Yinbox" width={150} />
          </a>
          <nav className="tree-nav">
            <a className="tree-nav__item-title highlight" onClick={() => handleNewMessage()}>
              NEW CONVERSATION
            </a>
            {chats &&
              chats.map((chat) => {
                return (
                  <a
                    key={chat.chatId}
                    onClick={() => handleSelectChat(chat)}
                    style={{ cursor: 'pointer' }}
                  >
                    <UserDisplay
                      key={chat.chatId}
                      name={
                        walletAddress === chat.participant
                          ? `${chat.participant} (You)`
                          : chat.participant
                      }
                      selected={chat.participant === selectedParticipant}
                    />
                  </a>
                );
              })}
          </nav>
        </div>
      </div>
      {showNewConversationDialog && (
        <NewConversationDialog
          show={true}
          onCancel={() => setShowNewConversationDialog(false)}
          onStartedConversation={(accountId: string) => handleStartedConversation(accountId)}
        />
      )}
    </>
  );
};

export default SideBar;
