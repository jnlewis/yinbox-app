
import { Blockchains } from 'core/enums/blockchains';
import { Wallet } from 'modules/blockchains/near/nearWalletSelector';
import { Config } from 'core/config/config';

export class WalletManager {

  CONTRACT_ADDRESS = Config.yinboxContractNEAR;
  wallet: Wallet;
  
  getWallet = () => this.wallet;
  
  startUpWallet = async (): Promise<boolean> => {
    this.wallet = new Wallet({ createAccessKeyFor: this.CONTRACT_ADDRESS });
    let isSignedIn = await this.wallet.startUp();
    return isSignedIn;
  }
  
  signIn = async (blockchain: Blockchains) => {
    if (blockchain === Blockchains.NEAR) {
      await this.wallet.signIn();
    }
  };

  signOut = async () => {
      await this.wallet.signOut();
      // localStorage.clearConnectedChain();
      // localStorage.clearWalletAddress();
  };

  isSignedIn = (): boolean => this.wallet?.accountId !== null && this.wallet?.accountId !== undefined;

  getWalletAddress = (): string => this.wallet?.accountId;

  // getLocalWalletAddress = (): string => localStorage.getWalletAddress();
  
  // getConnectedWallet = async (): Promise<WalletInfo> => {
  //   const connectedChain = localStorage.getConnectedChain();
  //   // const walletAddress = localStorage.getWalletAddress();
  
  //   if (connectedChain) {
  //     const walletInfo: WalletInfo = {
  //       blockchain: connectedChain as Blockchains,
  //       address: null,
  //       near: null,
  //     };
  
  //     if (connectedChain === Blockchains.NEAR) {
  //       try {
  //         logger.logInfo('getConnectedWallet', 'Getting NEAR testnet connection.');
  
  //         const nearWalletConnection = await NearWallet.getConnection();
  //         const user = await NearWallet.getUser(nearWalletConnection);
  //         localStorage.storeWalletAddress(user?.accountId);
  
  //         // Signin user and create self chat
  //         try {
  //           await Promise.all([
  //             signInUser({accountId: user?.accountId}),
  //             createChat({ owner: user?.accountId, participant: user?.accountId }),
  //           ]);
  //         }
  //         catch(e) {
  //           logger.logWarning('getConnectedWallet', 'Failed to sign in user.');
  //         }
  
  //         const walletInfo: WalletInfo = {
  //           blockchain: connectedChain as Blockchains,
  //           address: user?.accountId,
  //           near: {
  //             connection: nearWalletConnection,
  //           },
  //         };
  //       } catch (e) {
  //         logger.logError('getConnectedWallet', 'Failed to get NEAR testnet connection.');
  //       }
  //     }
  
  //     return walletInfo;
  //   } else {
  //     return null;
  //   }
  // };
  
  // export const connectWallet = async (blockchain: Blockchains) => {
  //   if (blockchain === Blockchains.NEAR) {
  //     // const nearWalletConnection = await NearWallet.getConnection();
  //     // await NearWallet.connect(nearWalletConnection);
  //     // localStorage.storeConnectedChain(blockchain);
  //     // const CONTRACT_ADDRESS = Config.yinboxContractNEAR;
  //     // const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
  //     wallet.signIn();
  //   }
  // };
  
  // export const disconnectWallet = async () => {
  //   // const connectedWallet = await getConnectedWallet();
  //   // if (connectedWallet?.blockchain === Blockchains.NEAR) {
  //   //   const nearWalletConnection = await NearWallet.getConnection();
  //   //   await NearWallet.disconnect(nearWalletConnection);
  //   // }
  
  //   localStorage.clearConnectedChain();
  //   localStorage.clearWalletAddress();
  // };
  
}

export default new WalletManager();
