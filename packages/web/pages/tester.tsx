import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import PageHead from '../components/PageHead/PageHead';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { create, open } from '@nearfoundation/near-js-encryption-box';
import { utils } from 'near-api-js';
import * as nearAPI from 'near-api-js';
import { getConnectionConfig } from 'modules/blockchains/near/nearConfig';
import { get } from 'lodash';
import { PublicKey } from 'near-api-js/lib/utils';
import * as CryptoJS from 'crypto-js';

    /**
     curl -X POST https://rpc.testnet.near.org -H 'content-type: application/json' --data \
    {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "query",
        "params": {
            "request_type": "view_access_key_list",
            "finality": "final",
            "account_id": "jeffreylewis-alice.testnet"
        }
    }
     */

    // How to tell if a person is who he say he is:
    // On server:
    // After login, take his private key, hash it into a public key. 
    // call rpc 'view_access_key_list' and verify that his public key exists in the list of access key

const Tester: NextPage = () => {
  const handle = () => {
    // encryptMessage();
    testAES();

  };

  const testAES = () => {

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

    console.log(ciphertext); 

    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText); // 'my message'
  }
  const bobPublicKey = 'ed25519:63oUFH1fLt5iCFjZ9fCKVM2qAxmFQ9YP1F5SqyyU4HW';

  /*
  BOB
  Sign in 1:
    nonce: 104898567000000
    publicKey: ed25519:3L1fwWvjrDRAur6tQfGBhVdcF2BtfnQrYuWniWh63edf
    secretKey: 3CRN3X4HeX17BQWtuC3GNUqqtjqVYTxrL2dmUH8z2teAHeUkzsiZx5LQhGjEFhhwdn2AEmup1pWYFfWPyKXeqhAh
  Sign in 2:
    nonce: 104898690000000
    publicKey: ed25519:4XpbN6rznBxtodzxeYFF3oEFHdsVciSsB1MfcCjHwVKu
    secretKey: 5yukhgWXfCs9uypUQ6qKBy8Gy8eYyaECUvFwtoz2cpAXhiMsbYTHBr9gdnNYEhr9CixkP93YcbAgowjtNSzR2qQj

  ALICE
  Sign in 1:
    publicKey: ed25519:DfdDNTcWwfRkdQeQFPenYAAx2GfFTKjL9kYua3zNm8JF
    secretKey: 2gNHPYgHnKFMAAkdk9dYxqZE2ngNNqssFTARU2Xb7Z7RiCb96u6VuJM7dGdRdBQzM4BjBhBkau9tAnHMzup9icTV
  */

  async function encryptMessage() {

    // // Getting connected wallet key pair
    // const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    // const nearConfig = getConnectionConfig('testnet', keyStore);
    // const near = await nearAPI.connect({ ...nearConfig });
    // const walletConnection = new nearAPI.WalletConnection(near, 'tc');
    
    // console.log(`Getting keyPair for account: ${walletConnection.getAccountId()}`);
    // const keyPair = await walletConnection._keyStore.getKey('testnet', walletConnection.getAccountId());

    // const secretKey = get(keyPair, 'secretKey', null);
    // console.log(`publicKey: ${ keyPair.getPublicKey().toString()}`);
    // console.log(`secretKey: ${secretKey}`);

    // // "public_key": "ed25519:hdpH7vESS5QyWAnoJ9EMbwncB9XXPn25rG21HqW6m4J"
    // // const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
    // // const alicePublicKey = PublicKey.fromString('hdpH7vESS5QyWAnoJ9EMbwncB9XXPn25rG21HqW6m4J');

    // // Encrypting a message
    // const message = 'Hello Bob';
    // const senderPrivateKey = secretKey;
    // const recipientPublicKey = alicePublicKey.toString();

    // const { secret, nonce } = create(message, recipientPublicKey, senderPrivateKey); // you can also pass your own custom nonce as a 4th parameter

    // console.log(`Encrypted message: ${secret}`);
    // console.log(`nonce: ${nonce}`);
  }

  async function decryptMessage() {

    const nonce = '';
    const message = '0lYNTvmPJOI9ABfvBWESp3jt/iYQ4flwgt76';

    // Getting connected wallet key pair
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const nearConfig = getConnectionConfig('testnet', keyStore);
    const near = await nearAPI.connect({ ...nearConfig });
    const walletConnection = new nearAPI.WalletConnection(near, 'tc');

    console.log(`Getting keyPair for account: ${walletConnection.getAccountId()}`);
    const keyPair = await walletConnection._keyStore.getKey('testnet', walletConnection.getAccountId());

    console.log('KeyPair:');
    console.log(keyPair);

    const secretKey = get(keyPair, 'secretKey', null);

    // Decrypting the message
    const senderPublicKey = "ed25519:HqiR9dMxG5Ueno4Q2BNdRfrEpXaxtFqt4CES13sEz9U4"; // alice's publickey
    const messageReceived = open(message, senderPublicKey, secretKey, nonce);

    console.log(`Decrypted message: ${messageReceived}`);
  }

  // export async function verifySignature() {
  //     const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  //     const nearConfig = getConnectionConfig('testnet', keyStore);
  //     // const keyPair = await keyStore.getKey(nearConfig.networkId, 'jeffreylewis-bob.testnet');
  //     const keyPair = await keyStore.getKey(nearConfig.networkId, 'jeffreylewis-bob.testnet');
  //     const msg = Buffer.from("hi");

  //     const { signature } = keyPair.sign(msg);

  //     console.log("msg", msg);
  //     console.log("signature:", signature);

  //     const isValid = keyPair.verify(msg, signature);

  //     console.log("Signature Valid?:", isValid);

  //     return isValid;
  //   }

  async function sam() {

    const message = 'Hello Bob';
    const publicKeyBob = 'jeffreylewis-bob.testnet';
    const privateKeyAlice = 'abcd1234';

    const { secret, nonce } = create(message, publicKeyBob, privateKeyAlice);
    console.log(`Encrypted message: ${secret}`);

    // // Randomly generating key pairs for the example
    // const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
    // const keyPairBob = utils.key_pair.KeyPairEd25519.fromRandom();

    // console.log(`keyPairAlice`);
    // console.log(keyPairAlice);

    // console.log(`keyPairBob`);
    // console.log(keyPairBob);

    // // Encrypting a message
    // const message = 'Hello Bob';
    // const publicKeyBob = keyPairBob.getPublicKey().toString();
    // const privateKeyAlice = keyPairAlice.secretKey;
    // const { secret, nonce } = create(message, publicKeyBob, privateKeyAlice); // you can also pass your own custom nonce as a 4th parameter

    // console.log(`Encrypted message: ${secret}`);

    // // Decrypting the message
    // const publicKeyAlice = keyPairAlice.getPublicKey().toString();
    // const privateKeyBob = keyPairBob.secretKey;
    // const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);

    // console.log(messageReceived); // will return 'Hello Bob'
  }

  return (
    <div className={styles.container}>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.intro}>
          <Container>
            <Row>
              <Col md={12} sm={12}>
                <div className={styles.introTextContainer}>
                  <h1 className={styles.title}>Tester</h1>
                  <div style={{ paddingTop: 30 }}>
                    <Button variant="primary" onClick={() => handle()}>
                      Test
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default Tester;
