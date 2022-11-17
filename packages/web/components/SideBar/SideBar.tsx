import NewMessageDialog from 'components/dialogs/NewMessageDialog/NewMessageDialog';
import UserDisplay from 'components/UserDisplay/UserDisplay';
import { Chat } from 'core/entities/chat';
import logger from 'core/logger/logger';
import { getConnectedWallet, getLocalWalletAddress } from 'modules/wallet/wallet';
import React, { useEffect, useState } from 'react';
import { fetchOwnerChats } from 'services/web/chatService';

interface SideBarProps {
  isOpen: boolean;
  walletAddress: string;
  onSelectChat: (chat: Chat) => void;
}

const SideBar = ({ isOpen, walletAddress, onSelectChat }: SideBarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [chats, setChats] = useState<Chat[]>();
  const [selectedParticipant, setSelectedParticipant] = useState<string>();

  useEffect(() => {
    loadChats();
  }, [chats]);

  const loadChats = async () => {
    if (chats?.length >= 0) {
      return;
    }

    setIsLoading(true);

    let chatsData = await fetchOwnerChats(walletAddress);

    // Order self chat to highest in list
    if (chatsData) {
      let selfChat = chatsData.find(
        (item) => item.owner === walletAddress && item.participant === walletAddress,
      );
      chatsData.splice(chatsData.indexOf(selfChat));
      chatsData.unshift(selfChat);
    }

    setChats(chatsData);

    setIsLoading(false);
  };

  const handleNewMessage = () => {
    setShowNewMessageDialog(true);
  };

  const handleStartedConversation = (accountId: string) => {
    setShowNewMessageDialog(false);
    // TODO: add to list of users
    // TODO: open the chat
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedParticipant(chat.participant);
    onSelectChat(chat);
  };

  return (
    <>
      <div id="sidebar-wrapper" style={{ marginLeft: `${isOpen ? '0' : '-360px'}` }}>
        <div className="sidebar">
          <div>
            <img src="/assets/yinbox/yinbox-logo-dark.svg" alt="Yinbox" width={150} />
          </div>
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
      {showNewMessageDialog && (
        <NewMessageDialog
          show={true}
          onCancel={() => setShowNewMessageDialog(false)}
          onStartedConversation={(accountId: string) => handleStartedConversation(accountId)}
        />
      )}
    </>
  );
};

export default SideBar;
