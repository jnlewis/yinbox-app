
import { Blockchains } from 'core/enums/blockchains';
import { Wallet } from 'modules/blockchains/near/nearWalletSelector';
import { Config } from 'core/config/config';
import localStorage from 'core/storage/localStorage';

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
    localStorage.clearAuthToken();
    await this.wallet.signOut();
  };

  isSignedIn = (): boolean => this.wallet?.accountId !== null && this.wallet?.accountId !== undefined;

  getWalletAddress = (): string => this.wallet?.accountId;
}

export default new WalletManager();
