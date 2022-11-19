import { Fees } from 'modules/blockchains/near/interface/fees';
import yinboxContractNEAR from './yinboxContractNEAR';
import { getConnection } from 'modules/blockchains/near/nearWallet';
import { Conversation } from './interface/conversation';
import WalletManager from 'modules/walletManager/walletManager';

class YinboxContract {
  async getConversation(sender: string, recipient: string): Promise<Conversation | null> {
    const nearConnection = await getConnection();
    return yinboxContractNEAR.getConversation(sender, recipient, WalletManager.getWallet());
  }

  async createConversation(recipient: string): Promise<void> {
    const fees: Fees = {
      gasFee: 20,
      depositAmount: 0.5,
    };

    const nearConnection = await getConnection();
    return yinboxContractNEAR.createConversation(recipient, WalletManager.getWallet(), fees);
  }
}

export default new YinboxContract();
