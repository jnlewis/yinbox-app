import { Blockchains } from 'core/enums/blockchains';
import { getConnection } from 'modules/blockchains/near/nearWallet';
import { NonFungibleToken } from 'modules/nonFungible/types/nonFungibleToken';
import { getLocalWalletAddress } from './wallet';
import NonFungible from 'modules/nonFungible/nonFungible';
import { Fees } from 'modules/blockchains/near/interface/fees';

export const fetchCollectibles = async (
  blockchain: Blockchains,
  contractAddresses: string[],
): Promise<NonFungibleToken[]> => {
  if (!contractAddresses || contractAddresses.length <= 0) {
    return [];
  }

  const collectibles: NonFungibleToken[] = [];

  if (blockchain === Blockchains.NEAR) {
    const nearConnection = await getConnection();
    const walletAddress = getLocalWalletAddress();

    for (const contractAddress of contractAddresses) {
      const fetchedTokens = await NonFungible.getOwnerTokens(
        blockchain,
        contractAddress,
        walletAddress,
        nearConnection,
      );
      if (fetchedTokens && fetchedTokens.length > 0) {
        collectibles.push(...fetchedTokens);
      }
    }
  }

  return collectibles;
};

export const approve = async (
  blockchain: Blockchains,
  contractAddress: string,
  tokenId: number,
  accountId: string,
): Promise<void> => {
  if (!contractAddress) {
    return;
  }

  if (blockchain === Blockchains.NEAR) {
    const nearConnection = await getConnection();

    const fees: Fees = {
      gasFee: 3,
      depositAmount: 0.00042,
    };

    await NonFungible.approve(
      blockchain,
      contractAddress,
      tokenId,
      accountId,
      nearConnection,
      fees,
    );
  }
};

export const checkIsApproved = async (
  blockchain: Blockchains,
  contractAddress: string,
  tokenId: number,
  address: string,
): Promise<boolean> => {
  let isApproved = false;

  if (blockchain === Blockchains.NEAR) {
    const nearConnection = await getConnection();
    const walletAddress = getLocalWalletAddress();
    isApproved = await NonFungible.isApproved(
      blockchain,
      contractAddress,
      tokenId,
      address,
      nearConnection,
    );
  }

  return isApproved;
};

// export const fetchSingleCollectible = () => {

//     const fetchedToken = await NonFungible.getToken(
//         blockchain,
//         inputContractAddress,
//         Number(inputTokenId),
//         nearConnection,
//       );
//       if (fetchedToken) {
//         if (!validateOwner(fetchedToken, walletAddress)) {
//           setIsLoading(false);
//           return;
//         }

//         tokens.push(fetchedToken);
//       }
// }

// const validateOwner = (token: NonFungibleToken, walletAddress: string): boolean => {
//     if (token.owner !== walletAddress) {
//       showMessage(
//         'Different Owner',
//         `A different wallet address owns this NFT: ${token.title}. Did you connect to the right wallet?`,
//       );
//       return false;
//     } else {
//       return true;
//     }
//   };
