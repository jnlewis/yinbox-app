import { Blockchains } from 'core/enums/blockchains';

class LocalStorage {
  storeAuthToken(token: string): void {
    window?.localStorage?.setItem('yinbox_authToken', token);
  }
  getAuthToken(): string | null {
    return window?.localStorage?.getItem('yinbox_authToken') || null;
  }
  clearAuthToken(): void {
    window?.localStorage?.removeItem('yinbox_authToken');
  }

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
