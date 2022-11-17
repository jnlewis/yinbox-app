import { Blockchains } from 'core/enums/blockchains';
import { WalletConnection } from 'near-api-js';

export interface WalletInfo {
  blockchain: Blockchains;
  address: string;
  near?: NearWalletInfo;
}

export interface NearWalletInfo {
  connection: WalletConnection;
}
