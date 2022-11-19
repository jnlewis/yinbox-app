import { Blockchains } from 'core/enums/blockchains';
import logger from 'core/logger/logger';
import { NonFungibleToken } from './types/nonFungibleToken';
import nonFungibleNEAR from './nonFungibleNEAR';
import WalletManager from 'modules/walletManager/walletManager';

class NonFungible {
  
  async getToken(
    blockchain: Blockchains,
    contractAddress: string,
    tokenId: number,
  ): Promise<NonFungibleToken> {
    logger.logInfo('getToken', `Begin. blockchain: ${blockchain} tokenId: ${tokenId}`);

    if (blockchain === Blockchains.NEAR) {
      return nonFungibleNEAR.getToken(
        contractAddress,
        tokenId,
        WalletManager.getWallet(),
      );
    }

    return null;
  }
}

export default new NonFungible();
