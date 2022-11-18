import { getConnectionConfig } from './nearConfig';
import * as nearAPI from 'near-api-js';
import { WalletConnection } from 'near-api-js';
import { Config } from 'core/config/config';

const CONTRACT_NAME = Config.yinboxContractNEAR;

export async function getConnection() {
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  const nearConfig = getConnectionConfig('testnet', keyStore);
  const near = await nearAPI.connect({ ...nearConfig });
  const walletConnection = new nearAPI.WalletConnection(near, 'tc');

  return walletConnection;
}

export async function getUser(walletConnection: WalletConnection) {
  if (walletConnection.getAccountId()) {
    return {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  } else {
    return null;
  }
}

export async function isConnected(): Promise<boolean> {
  const nearWalletConnection = await getConnection();
  const user = await getUser(nearWalletConnection);
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function connect(walletConnection: WalletConnection) {
  walletConnection.requestSignIn({
    contractId: CONTRACT_NAME,
    methodNames: ['create_conversation'],
    successUrl: '/chat',
    failureUrl: '',
  });
}

export async function disconnect(walletConnection: WalletConnection) {
  walletConnection.signOut();
}

export async function getAccount(walletConnection: WalletConnection) {
  return await walletConnection.account();
}
