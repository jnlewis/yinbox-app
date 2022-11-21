# Yinbox

### Integrated Instant Messenger on NEAR
#### Secured. Integrated. Spam free.

Yinbox is the first fully integrated messenger app with end-to-end encryption and spam prevention on NEAR protocol. Start a conversation with anyone on NEAR with nothing but their wallet account name, link any NFTs on the network, engage in a rich and intuitive messaging experience. Just connect your wallet and you're good to go, no signups required.

**Contents**

- [Features](#features)
- [Process Flow](#process-flow)
- [Technologies](#technologies)
- [Live Product Preview](#live-product-preview)
- [Developer Quick Start](#developer-quick-start)
    - [Project Structure](#project-structure)
    - [Smart Contracts Quick Start](#smart-contracts-quick-start)
    - [Smart Contracts Functions and Interface](#smart-contracts-functions-and-interface)
    - [Web and API Quick Start](#web-and-api-quick-start)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **End-to-End Encryption**
    - Your messages are secured so only you and the person you're communicating with can read them. No one else in between can see your conversation, not even us at Yinbox.

- **Fee Based Spam Prevention**
    - To prevent spams, Yinbox charges a one time fee of 0.5 NEAR when beginning a new conversation with anyone.

- **On-Chain and Off-Chain Symbiosis**
    - Security, Speed and Convenience
    
- **NFT Integration**
    - Link any NFTs on NEAR protocol via special chat commands.

- **More exciting features coming soon**
    - Send and receive payments, see real-time asset prices, trade NFTs - all within the conversation.

## Process Flow

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/yinbox-flow.jpg" alt="Process Flow">
</p>

1. **Wallet Sign-In** Users first connect their wallet using a wallet provider like My NEAR Wallet, then signs a message to Yinbox Authentication API, which verifies the authenticity and returns a generated JWT token for subsequent Yinbox API calls.

2. **End-To-End Encryption** When starting a conversation with anyone, a session key is generated. This session key is unique for each conversation between two people, and is used to encrypt and decrypt messages on the browser.

3. **Fee Based Spam Protection** For new conversation, Yinbox Smart Contract receives an unlock fee and stores the conversation unlock record on the blockchain. The unlock fee is configurable to maintain a balance between spam prevention and usage feasibility.

4. **Message Transmission** All messages are encrypted on users browser using the conversation session key before they are sent across the network. They remain encrypted even on Yinbox and is only decrypted on the recipient browser.

## Technologies

<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/yinbox-architecture.jpg" alt="Architecture">
</p>

**Web Application (UX)**

- The frontend web application is developed in **React** using the **NextJS** framework.

**Wallet Provider**

- The wallet provider used to integrate with NEAR, using [NEAR Wallet Selector](https://github.com/near/wallet-selector).

**Blockchain Smart Contract**

- **Yinbox Contract**: NEAR Smart Contract writen in AssemblyScript responsible for creating and verifying chat conversations. See [Yinbox Smart Contract Developer Readme](https://github.com/jnlewis/yinbox-app/tree/main/packages/contract/near) for interface methods.

**Yinbox API**

- The REST API is developed in **NodeJS**, and acts as the interface between the Frontend Web Application with the underlying application and off-chain database. 

**Off-Chain Database**

- The offchain database allows for instant and zero fees messaging. All messages stored on the offchain database is encrypted and secured.

## Live Product Preview

Alpha Preview: [yinbox.chat](https://www.yinbox.chat)

This is an early build version of the application on testnet. The smart contracts are deployed to the following accounts on NEAR testnet:
- **yinbox.jeffreylewis.testnet**

## Developer Quick Start

#### Project Structure

- **docs** - project documentation
- **packages**
    - **contract** - Yinbox smart contracts package and source
    - **web** - React NextJS Web application package and source
    - **api** - NodeJS Express API application package and source

#### Smart Contracts Quick Start

- Refer to the [Yinbox Smart Contract Developer Readme](https://github.com/jnlewis/yinbox-app/tree/main/packages/contract/near)

#### Smart Contracts Functions and Interface

- Refer to the [Yinbox Smart Contract Developer Readme](https://github.com/jnlewis/yinbox-app/tree/main/packages/contract/near)

#### Web and API Quick Start

- Refer to the [Web Application Developer Readme](https://github.com/jnlewis/yinbox-app/tree/main/packages/web/README.md)


## Screenshots

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/screenshots/screenshot-chat.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/screenshots/screenshot-landing-1.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/screenshots/screenshot-landing-2.png" alt="">
</p>

## License

[Apache 2.0](https://github.com/jnlewis/yinbox-app/blob/main/LICENSE)
