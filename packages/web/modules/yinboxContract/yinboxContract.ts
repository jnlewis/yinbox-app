import { Fees } from 'modules/blockchains/near/interface/fees';
import yinboxContractNEAR from './yinboxContractNEAR';
import { Conversation } from './interface/conversation';
import WalletManager from 'modules/walletManager/walletManager';

class YinboxContract {
  async getConversation(sender: string, recipient: string): Promise<Conversation | null> {
    return yinboxContractNEAR.getConversation(sender, recipient, WalletManager.getWallet());
  }

  async createConversation(recipient: string): Promise<void> {
    const fees: Fees = {
      gasFee: 20,
      depositAmount: 0.5,
    };

    return yinboxContractNEAR.createConversation(recipient, WalletManager.getWallet(), fees);
  }
}

export default new YinboxContract();
