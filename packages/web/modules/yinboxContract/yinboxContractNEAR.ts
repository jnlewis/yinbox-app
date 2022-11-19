import logger from 'core/logger/logger';
import { ConnectedWalletAccount, WalletConnection } from 'near-api-js';
import * as nearAPI from 'near-api-js';
import { Config } from 'core/config/config';
import NEARUtils from 'modules/blockchains/near/nearUtils';
import { Fees } from 'modules/blockchains/near/interface/fees';
import { Conversation } from './interface/conversation';
import { Wallet } from 'modules/blockchains/near/nearWalletSelector';

class YinboxContractNEAR {

  async getConversation(
    sender: string,
    recipient: string,
    wallet: Wallet,
  ): Promise<Conversation | null> {
    try {
      logger.logInfo(
        'getConversation',
        `Begin. sender: ${sender}, recipient: ${recipient}`,
      );

      // const nearAccount = await walletConnection.account();
      // const contract = this.getYinboxContract(nearAccount);
      // const response = await (contract as any).get_conversation({ sender, recipient });

      const response = await wallet.viewMethod({
        contractId: Config.yinboxContractNEAR,
        method: 'get_conversation',
        args: { sender, recipient },
      });

      logger.logInfo('getConversation', `get_conversation: ${response}`);

      if (response) {
        const result: Conversation = {
          conversationId: response.conversation_id,
          participantA: response.participant_a,
          participantB: response.participant_b,
          createdBy: response.created_by,
          feePaid: response.fee_paid,
          status: response.status,
        };
        return result;
      } else {
        return null;
      }
    } catch (e) {
      logger.logError('getConversation', 'Failed.', e);
    }
  }

  async createConversation(
    recipient: string,
    wallet: Wallet,
    fees?: Fees,
  ): Promise<void> {
    try {
      const gas = this.getGas(fees);
      const depositAmount = this.getDepositAmount(fees);

      logger.logInfo(
        'createConversation',
        `Begin. recipient: ${recipient}`,
      );

      const response = await wallet.callMethod({
        contractId: Config.yinboxContractNEAR,
        method: 'create_conversation',
        args: { recipient },
        gas,
        deposit: depositAmount,
      });


      logger.logInfo('createConversation', `Response: ${response}`);
    } catch (e) {
      logger.logError('createConversation', 'Failed.', e);
    }
  }

  private getGas(fees?: Fees): string {
    return fees ? NEARUtils.convertGasToTGAS(fees?.gasFee) : '0';
  }
  
  private getDepositAmount(fees?: Fees): string {
    return fees ? NEARUtils.convertNEARToYoctoNEAR(fees?.depositAmount) : '0';
  }
}

export default new YinboxContractNEAR();
