export enum Blockchains {
  None = '',
  Tron = 'Tron',
  NEAR = 'NEAR',
  Ethereum = 'Ethereum',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.Tron, 'Tron'],
  [Blockchains.NEAR, 'NEAR'],
  [Blockchains.Ethereum, 'Ethereum'],
]);

export const getBlockchainLabel = (blockchain: Blockchains): string | undefined =>
  BlockchainLabelMap.get(blockchain);
