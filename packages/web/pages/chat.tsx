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
import { getConnectedWallet, getLocalWalletAddress } from 'modules/wallet/wallet';
import logger from 'core/logger/logger';

const Chat: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState<Chat>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const connectedWallet = await getConnectedWallet();
      if (connectedWallet) {
        setIsConnected(true);
      }
      setIsLoading(false);
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
          {!isLoading && !isConnected && <div>Please connect wallet</div>}
          {!isLoading && isConnected && (
            <Row className="flex-container">
              <SideBar
                isOpen={isMenuOpen}
                walletAddress={getLocalWalletAddress()}
                onSelectChat={(chat) => handleSelectChat(chat)}
              />

              <div id="page-content-wrapper">
                {selectedChat && (
                  <>
                    <MessageHeader name={selectedChat.participant} onPrimaryClick={() => setIsMenuOpen(!isMenuOpen)} isSelf={selectedChat.participant === getLocalWalletAddress()} />
                    <div className="page-content">
                      <MessageFeed chat={selectedChat} isSelf={selectedChat.participant === getLocalWalletAddress()} />
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
