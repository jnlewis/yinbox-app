import logger from 'core/logger/logger';
import { ConnectedWalletAccount, WalletConnection } from 'near-api-js';
import * as nearAPI from 'near-api-js';
import { Config } from 'core/config/config';
import NEARUtils from 'modules/blockchains/near/nearUtils';
import { Fees } from 'modules/blockchains/near/interface/fees';
import { Conversation } from './interface/conversation';

class YinboxContractNEAR {

  // async getAllConversations(
  //   walletConnection: WalletConnection,
  // ): Promise<Conversation | null> {
  //   try {
  //     logger.logInfo(
  //       'getAllConversations',
  //       `Begin`,
  //     );

  //     const nearAccount = await walletConnection.account();
  //     const contract = this.getYinboxContract(nearAccount);

  //     const response = await (contract as any).get_all_conversations();

  //     logger.logInfo('getAllConversations', `get_all_conversations: ${response}`);

  //     if (response) {
  //       const result: Conversation = {
  //         conversationId: response.conversation_id,
  //         participantA: response.participant_a,
  //         participantB: response.participant_b,
  //         createdBy: response.created_by,
  //         feePaid: response.fee_paid,
  //         status: response.status,
  //       };
  //       return result;
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     logger.logError('getAllConversations', 'Failed.', e);
  //   }
  // }

  async getConversation(
    sender: string,
    recipient: string,
    walletConnection: WalletConnection,
  ): Promise<Conversation | null> {
    try {
      logger.logInfo(
        'getConversation',
        `Begin. sender: ${sender}, recipient: ${recipient}`,
      );

      const nearAccount = await walletConnection.account();
      const contract = this.getYinboxContract(nearAccount);

      const response = await (contract as any).get_conversation({ sender, recipient });

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
    walletConnection: WalletConnection,
    fees?: Fees,
  ): Promise<void> {
    try {
      const gas = this.getGas(fees);
      const depositAmount = this.getDepositAmount(fees);

      logger.logInfo(
        'createConversation',
        `Begin. recipient: ${recipient}`,
      );

      const nearAccount = await walletConnection.account();
      const contract = this.getYinboxContract(nearAccount);

      const response = await (contract as any).create_conversation(
        {
          recipient,
        },
        gas,
        depositAmount,
      );

      logger.logInfo('createConversation', `Response: ${response}`);
    } catch (e) {
      logger.logError('createConversation', 'Failed.', e);
    }
  }

  private getYinboxContract(account: ConnectedWalletAccount) {
    return new nearAPI.Contract(account, Config.yinboxContractNEAR, {
      viewMethods: ['get_conversation'],
      changeMethods: ['create_conversation'],
    });
  }

  private getGas(fees?: Fees): string {
    return fees ? NEARUtils.convertGasToTGAS(fees?.gasFee) : '0';
  }

  private getDepositAmount(fees?: Fees): string {
    return fees ? NEARUtils.convertNEARToYoctoNEAR(fees?.depositAmount) : '0';
  }
}

export default new YinboxContractNEAR();
