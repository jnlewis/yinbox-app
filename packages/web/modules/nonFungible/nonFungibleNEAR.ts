import logger from 'core/logger/logger';
import { NonFungibleToken, NonFungibleTokenContract } from './types/nonFungibleToken';
import { ConnectedWalletAccount, WalletConnection } from 'near-api-js';
import * as nearAPI from 'near-api-js';
import { Blockchains } from 'core/enums/blockchains';

class NonFungibleNEAR {

  async getOwnerTokens(
    nftContractAddress: string,
    owner: string,
    walletConnection: WalletConnection,
  ): Promise<NonFungibleToken[]> {
    try {
      logger.logInfo('getOwnerTokens', `Begin. owner: ${owner}`);

      if (!nftContractAddress || !owner || !walletConnection) {
        logger.logError('getOwnerTokens', 'Unable to proceed. Parameters incomplete.');
        return [];
      }

      const nearAccount = await walletConnection.account();

      // NEP-171 and NEP-177
      const contract = this.getNonFungibleContract(nearAccount, nftContractAddress);

      const response = await (contract as any).nft_tokens_for_owner({ account_id: owner });

      const result: NonFungibleToken[] = [];
      response?.forEach((element) => {
        result.push({
          contract: {
            blockchain: Blockchains.NEAR,
            address: nftContractAddress,
          },
          owner: element.owner_id,
          tokenId: element.token_id,
          title: element.metadata.title,
          description: element.metadata.description,
          mediaUrl: element.metadata.media,
        });
      });

      return result;
    } catch (e) {
      logger.logError('getOwnerTokens', 'Failed.', e);
    }
  }

  async getToken(
    nftContractAddress: string,
    tokenId: number,
    walletConnection: WalletConnection,
  ): Promise<NonFungibleToken> {
    try {
      logger.logInfo(
        'getToken',
        `Begin. nftContractAddress: ${nftContractAddress} tokenId: ${tokenId}`,
      );

      const nearAccount = await walletConnection.account();
      const contract = this.getNonFungibleContract(nearAccount, nftContractAddress);

      const response = await (contract as any).nft_token({ token_id: tokenId.toString() });

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

  async getContractMetadata(
    nftContractAddress: string,
    owner: string,
    walletConnection: WalletConnection,
  ): Promise<NonFungibleTokenContract> {
    try {
      logger.logInfo(
        'getContractMetadata',
        `Begin. nftContractAddress: ${nftContractAddress} owner: ${owner}`,
      );

      const nearAccount = await walletConnection.account();

      const contract = this.getNonFungibleContract(nearAccount, nftContractAddress);

      const response = await (contract as any).nft_metadata();
      console.log(response);

      return null;
    } catch (e) {
      logger.logError('getContractMetadata', 'Failed.', e);
    }
  }

  // NEP-171 and NEP-177
  private getNonFungibleContract(account: ConnectedWalletAccount, nftContractAddress: string) {
    return new nearAPI.Contract(account, nftContractAddress, {
      viewMethods: ['nft_metadata', 'nft_tokens_for_owner', 'nft_token', 'nft_is_approved'],
      changeMethods: ['nft_approve'],
    });
  }
}

export default new NonFungibleNEAR();
