import { NearWalletInfo, WalletInfo } from './types/walletInfo';
import * as NearWallet from 'modules/blockchains/near/nearWallet';
import localStorage from 'core/storage/localStorage';
import { Blockchains } from 'core/enums/blockchains';
import logger from 'core/logger/logger';
import { signInUser } from 'services/web/userService';
import { createChat } from 'services/web/chatService';

export const getLocalWalletAddress = (): string => localStorage.getWalletAddress();

export const getConnectedWallet = async (): Promise<WalletInfo> => {
  const connectedChain = localStorage.getConnectedChain();
  // const walletAddress = localStorage.getWalletAddress();

  if (connectedChain) {
    const walletInfo: WalletInfo = {
      blockchain: connectedChain as Blockchains,
      address: null,
      near: null,
    };

    if (connectedChain === Blockchains.NEAR) {
      try {
        logger.logInfo('getConnectedWallet', 'Getting NEAR testnet connection.');

        const nearWalletConnection = await NearWallet.getConnection();
        const user = await NearWallet.getUser(nearWalletConnection);
        localStorage.storeWalletAddress(user?.accountId);

        // Signin user and create self chat
        try {
          await Promise.all([
            signInUser({accountId: user?.accountId}),
            createChat({ owner: user?.accountId, participant: user?.accountId }),
          ]);
        }
        catch(e) {
          logger.logWarning('getConnectedWallet', 'Failed to sign in user.');
        }

        const walletInfo: WalletInfo = {
          blockchain: connectedChain as Blockchains,
          address: user?.accountId,
          near: {
            connection: nearWalletConnection,
          },
        };
      } catch (e) {
        logger.logError('getConnectedWallet', 'Failed to get NEAR testnet connection.');
      }
    }

    return walletInfo;
  } else {
    return null;
  }
};

export const connectWallet = async (blockchain: Blockchains) => {
  if (blockchain === Blockchains.NEAR) {
    const nearWalletConnection = await NearWallet.getConnection();
    await NearWallet.connect(nearWalletConnection);
    localStorage.storeConnectedChain(blockchain);
  }
};

export const disconnectWallet = async () => {
  const connectedWallet = await getConnectedWallet();
  if (connectedWallet?.blockchain === Blockchains.NEAR) {
    const nearWalletConnection = await NearWallet.getConnection();
    await NearWallet.disconnect(nearWalletConnection);
  }

  localStorage.clearConnectedChain();
  localStorage.clearWalletAddress();
};
