export enum Blockchains {
  None = '',
  NEAR = 'NEAR',
}

export const BlockchainLabelMap = new Map<Blockchains, string>([
  [Blockchains.None, ''],
  [Blockchains.NEAR, 'NEAR'],
]);

export const getBlockchainLabel = (blockchain: Blockchains): string | undefined =>
  BlockchainLabelMap.get(blockchain);
