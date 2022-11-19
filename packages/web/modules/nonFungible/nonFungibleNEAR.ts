import logger from 'core/logger/logger';
import { NonFungibleToken, NonFungibleTokenContract } from './types/nonFungibleToken';
import { ConnectedWalletAccount, WalletConnection } from 'near-api-js';
// import * as nearAPI from 'near-api-js';
import { Blockchains } from 'core/enums/blockchains';
import { Wallet } from 'modules/blockchains/near/nearWalletSelector';

class NonFungibleNEAR {

  async getToken(
    nftContractAddress: string,
    tokenId: number,
    wallet: Wallet,
  ): Promise<NonFungibleToken> {
    try {
      logger.logInfo(
        'getToken',
        `Begin. nftContractAddress: ${nftContractAddress} tokenId: ${tokenId}`,
      );

      const response = await wallet.viewMethod({
        contractId: nftContractAddress,
        method: 'nft_token',
        args: { token_id: tokenId.toString() },
      });

      logger.logInfo('getToken', `nft_token Response: ${response}`);

      const result: NonFungibleToken = {
        contract: {
          blockchain: Blockchains.NEAR,
          address: nftContractAddress,
        },
        owner: response.owner_id,
        tokenId: response.tokenId,
        title: response.metadata.title,
        description: response.metadata.description,
        mediaUrl: response.metadata.media,
      };

      return result;
    } catch (e) {
      logger.logError('getToken', 'Failed.', e);
    }
  }
}

export default new NonFungibleNEAR();
