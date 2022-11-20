import { Blockchains } from 'core/enums/blockchains';

class LocalStorage {
  storeConnectedChain(blockchain: Blockchains): void {
    window?.localStorage?.setItem('yinbox_connectedChain', blockchain);
  }

  getConnectedChain(): string | null {
    return window?.localStorage?.getItem('yinbox_connectedChain') || null;
  }

  clearConnectedChain(): void {
    window?.localStorage?.removeItem('yinbox_connectedChain');
  }
}

export default new LocalStorage();
