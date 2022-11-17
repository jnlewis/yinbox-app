export interface NearConnectionConfig {
  networkId: string;
  keyStore: any;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
}

export const getConnectionConfig = (env: string, keyStore: any): NearConnectionConfig => {
  switch (env) {
    case 'mainnet':
      return {
        networkId: 'mainnet',
        keyStore,
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.mainnet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
      };
    case 'testnet':
      return {
        networkId: 'testnet',
        keyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        keyStore,
        nodeUrl: 'https://rpc.betanet.near.org',
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        explorerUrl: 'https://explorer.betanet.near.org',
      };
    case 'local':
      return {
        networkId: 'local',
        keyStore,
        nodeUrl: 'http://localhost:3030',
        walletUrl: 'http://localhost:4000/wallet',
        helperUrl: '',
        explorerUrl: '',
      };
    default:
      throw Error(`Unconfigured environment '${env}'.`);
  }
};
