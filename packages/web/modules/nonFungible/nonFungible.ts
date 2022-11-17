import { Blockchains } from 'core/enums/blockchains';
import logger from 'core/logger/logger';
import { NonFungibleToken } from './types/nonFungibleToken';
import nonFungibleNEAR from './nonFungibleNEAR';
import { WalletConnection } from 'near-api-js';
import { getConnection } from 'modules/blockchains/near/nearWallet';
import { getLocalWalletAddress } from 'modules/wallet/wallet';

class NonFungible {
  async getOwnerTokens(
    blockchain: Blockchains,
    contractAddress: string,
    owner: string,
    walletConnection?: unknown,
  ): Promise<NonFungibleToken[]> {
    logger.logInfo('getOwnerTokens', `Begin. blockchain: ${blockchain} owner: ${owner}`);

    if (blockchain === Blockchains.NEAR) {
      return nonFungibleNEAR.getOwnerTokens(
        contractAddress,
        owner,
        walletConnection as WalletConnection,
      );
    }

    return [];
  }

  async getToken(
    blockchain: Blockchains,
    contractAddress: string,
    tokenId: number,
  ): Promise<NonFungibleToken> {
    logger.logInfo('getToken', `Begin. blockchain: ${blockchain} tokenId: ${tokenId}`);

    if (blockchain === Blockchains.NEAR) {
      const nearConnection = await getConnection();
      const walletAddress = getLocalWalletAddress();
      return nonFungibleNEAR.getToken(
        contractAddress,
        tokenId,
        nearConnection as WalletConnection,
      );
    }

    return null;
  }
}

export default new NonFungible();
