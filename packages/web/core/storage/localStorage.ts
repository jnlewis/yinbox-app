import { Blockchains } from 'core/enums/blockchains';

class LocalStorage {
  storeLastMessageTimestamp(timestamp: number): void {
    window?.localStorage?.setItem(`yinbox_lastMessageTimestamp`, timestamp.toString());
  }
  getLastMessageTimestamp(): number {
    return window?.localStorage?.getItem(`yinbox_lastMessageTimestamp`)
      ? Number(window.localStorage.getItem(`yinbox_lastMessageTimestamp`)) ?? 0
      : null;
  }
  clearLastMessageTimestamp() {
    window?.localStorage?.removeItem(`yinbox_lastMessageTimestamp`);
  }

  storeTransition(key: string, contents: any): void {
    window?.localStorage?.setItem(`yinbox_transition_${key}`, JSON.stringify(contents));
  }
  getTransition(key: string): any {
    return window?.localStorage?.getItem(`yinbox_transition_${key}`)
      ? JSON.parse(window.localStorage.getItem(`yinbox_transition_${key}`) || '')
      : null;
  }
  clearTransition(key: string): any {
    window?.localStorage?.removeItem(`yinbox_transition_${key}`);
  }

  storeConnectedChain(blockchain: Blockchains): void {
    window?.localStorage?.setItem('yinbox_connectedChain', blockchain);
  }

  getConnectedChain(): string | null {
    return window?.localStorage?.getItem('yinbox_connectedChain') || null;
  }

  storeWalletAddress(address: string): void {
    window?.localStorage?.setItem('yinbox_walletAddress', address);
  }

  getWalletAddress(): string | null {
    return window?.localStorage?.getItem('yinbox_walletAddress') || null;
  }

  clearConnectedChain(): void {
    window?.localStorage?.removeItem('yinbox_connectedChain');
  }

  clearWalletAddress(): void {
    window?.localStorage?.removeItem(`near-api-js:keystore:${this.getWalletAddress()}:testnet`);
    window?.localStorage?.removeItem('yinbox_walletAddress');
  }
}

export default new LocalStorage();
