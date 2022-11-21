import React, { useEffect, useState } from 'react';
import { Navbar, Button, NavDropdown } from 'react-bootstrap';
import styles from './Navigation.module.scss';
import { Blockchains } from 'core/enums/blockchains';
import SelectBlockchainDialog from 'components/dialogs/SelectBlockchainDialog/SelectBlockchainDialog';
import WalletManager from 'modules/walletManager/walletManager';
import { signInUser } from 'services/web/userService';
import { createChat } from 'services/web/chatService';
import logger from 'core/logger/logger';

interface NavigationProps {
  showConnectWallet?: boolean;
}

const Navigation = ({ showConnectWallet }: NavigationProps) => {
  const [showSelectBlockchainDialog, setShowSelectBlockchainDialog] = useState(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const isSignedIn = await WalletManager.startUpWallet();
      setWalletIsConnected(isSignedIn);
      setIsReady(true);

      if (isSignedIn) {
        
        // Signin user and create self chat
        try {
          await Promise.all([
            signInUser({accountId: WalletManager.getWalletAddress()}),
            createChat({ participant: WalletManager.getWalletAddress() }),
          ]);
        }
        catch(e) {
          logger.logWarning('signIn', 'Failed to sign in user.');
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    setShowSelectBlockchainDialog(showConnectWallet);
  }, [showConnectWallet]);

  const handleConnect = async () => {
    setShowSelectBlockchainDialog(true);
  };

  const handleDisconnect = async () => {
    await WalletManager.signOut();
    // await disconnectWallet();
    // location.href = '/';
  };

  const handleConnectCancelled = async () => {
    setShowSelectBlockchainDialog(false);
  };

  const handleConnectBlockchainSelected = async (blockchain: Blockchains) => {
    setShowSelectBlockchainDialog(false);
    await WalletManager.signIn(blockchain);
  };

  return (
    <>
      <Navbar fixed="top" className={styles.nav} collapseOnSelect expand="sm">
        <Navbar.Brand className={styles.brand} href="/">
          <img src="/assets/yinbox/yinbox-logo-dark.svg" alt="Yinbox" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-scroll" data-bs-target="navbar-scroll" />
        {isReady && walletIsConnected && (
          <Navbar.Collapse id="navbar-scroll" className="justify-content-end">
            <Navbar.Text>
              <a className={styles.linkItem} href="/chat">
                Chat
              </a>
            </Navbar.Text>
            <NavDropdown title="Wallet">
              <Navbar.Text>
                <div className={styles.account}>{WalletManager.getWalletAddress()}</div>
              </Navbar.Text>
              <NavDropdown.Item className={styles.linkItemBold} onClick={() => handleDisconnect()}>
                Disconnect
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        )}
        {isReady && !walletIsConnected && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a className={styles.linkItemBoldWhite} onClick={() => handleConnect()}>
                Connect Wallet
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        )}
      </Navbar>
      {showSelectBlockchainDialog && (
        <SelectBlockchainDialog
          show={true}
          onCancel={() => handleConnectCancelled()}
          onSelect={(blockchain: Blockchains) => handleConnectBlockchainSelected(blockchain)}
        />
      )}
    </>
  );
};

export default Navigation;

