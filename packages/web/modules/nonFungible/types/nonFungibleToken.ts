import { Blockchains } from 'core/enums/blockchains';

export interface NonFungibleTokenContract {
  blockchain: Blockchains;
  address: string;
  name?: string;
  symbol?: string;
}

export interface NonFungibleToken {
  contract: NonFungibleTokenContract;
  owner: string;
  tokenId: number;
  title: string;
  description: string;
  mediaUrl: string;
}
