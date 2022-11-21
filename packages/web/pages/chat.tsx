import type { NextPage } from 'next';
import styles from '../styles/Chat.module.scss';
import PageHead from '../components/PageHead/PageHead';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Navigation from 'components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import MessageFeed from 'components/MessageFeed/MessageFeed';
import SideBar from 'components/SideBar/SideBar';
import MessageHeader from 'components/MessageHeader/MessageHeader';
import { Chat } from 'core/entities/chat';
import logger from 'core/logger/logger';
import WalletManager from 'modules/walletManager/walletManager';
import localStorage from 'core/storage/localStorage';

const Chat: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState<Chat>(null);
  const [isWalletConnected, setWalletIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const isSignedIn = await WalletManager.startUpWallet();
      setWalletIsConnected(isSignedIn);
      setIsLoading(false);

      if (!isSignedIn || !localStorage.getAuthToken()) {
        location.href = '/';
      }
    };
    init();
  }, []);

  const handleSelectChat = async (chat: Chat) => {
    logger.logInfo('handleSelectChat', 'Begin', `chat.chatId: ${chat.chatId}`);

    setSelectedChat(chat);
  };

  return (
    <div className={styles.container}>
      <PageHead />
      <main className={styles.main}>
        <Container fluid>
          {isLoading && (<div>Loading...</div>)}
          {!isLoading && isWalletConnected && (
            <Row className="flex-container">
              <SideBar
                isOpen={isMenuOpen}
                walletAddress={WalletManager.getWalletAddress()}
                onSelectChat={(chat) => handleSelectChat(chat)}
              />

              <div id="page-content-wrapper">
                {selectedChat && (
                  <>
                    <MessageHeader name={selectedChat.participant} onPrimaryClick={() => setIsMenuOpen(!isMenuOpen)} isSelf={selectedChat.participant === WalletManager.getWalletAddress()} />
                    <div className="page-content">
                      <MessageFeed chat={selectedChat} isSelf={selectedChat.participant === WalletManager.getWalletAddress()} />
                    </div>
                  </>
                )}
              </div>
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default Chat;
