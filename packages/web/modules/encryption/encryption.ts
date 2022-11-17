import * as CryptoJS from 'crypto-js';

export const encrypt = (text: string, secret: string) => {
  return CryptoJS.AES.encrypt(text, secret).toString();
};

export const decrypt = (text: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(text, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
