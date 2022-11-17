import React, { useEffect, useState } from 'react';
import { Navbar, Button, NavDropdown } from 'react-bootstrap';
import styles from './Navigation.module.scss';
import { Blockchains } from 'core/enums/blockchains';
import SelectBlockchainDialog from 'components/dialogs/SelectBlockchainDialog/SelectBlockchainDialog';
import {
  connectWallet,
  disconnectWallet,
  getConnectedWallet,
  getLocalWalletAddress,
} from 'modules/wallet/wallet';

interface NavigationProps {
  showConnectWallet?: boolean;
}

const Navigation = ({ showConnectWallet }: NavigationProps) => {
  const [showSelectBlockchainDialog, setShowSelectBlockchainDialog] = useState(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false);
  const [walletBlockchain, setWalletBlockchain] = useState<Blockchains>();
  const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const connectedWallet = await getConnectedWallet();
      if (connectedWallet) {
        setWalletIsConnected(true);
        setWalletBlockchain(connectedWallet.blockchain);
        setWalletAddress(connectedWallet.address);
      }
      setIsReady(true);

      if (showConnectWallet) {
        setShowSelectBlockchainDialog(true);
      }
    };
    init();
  }, []);

  const handleConnect = async () => {
    setShowSelectBlockchainDialog(true);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    location.href = '/';
  };

  const handleConnectCancelled = async () => {
    setShowSelectBlockchainDialog(false);
  };

  const handleConnectBlockchainSelected = async (blockchain: Blockchains) => {
    setShowSelectBlockchainDialog(false);
    await connectWallet(blockchain);
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
                <div className={styles.account}>{getLocalWalletAddress()}</div>
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
              <a className={styles.linkItemBold} onClick={() => handleConnect()}>
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

