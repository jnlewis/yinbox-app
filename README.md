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
    - [Deploying to development environment](#deploying-to-development-environment)
    - [Running Web Application](#running-web-application)
- [Interacting With the Contracts](#interacting-with-the-contracts)
    - [Exchange Contract functions](#exchange-contract-functions)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **End-to-End Encryption**
    - Your messages are secured so only you and the person you're communicating with can read them. No one else in between can see your conversation, not even us at Yinbox.

- **Fee Based Spam Prevention**
    - To prevent spams, Yinbox charges a one time fee of 0.5 NEAR when beginning a new conversation with anyone.

- **Physical Message Deletion**
    - Messages you delete are physically removed from Yinbox servers, like it never happened in the first place.

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

1. **Seller** creates a listing by transferring their NFT to the exchange smart contract. The exchange contract creates a listing record tied to the receiving NFT and the seller account ID.

2. **Buyer** make an offer on a listing by transferring their NFT to exchange smart contract. The exchange contract creates an offer record tied to the receiving NFT and the buyer account ID.

3. If **seller** accepts the offer, the exchange contract transfers the offer NFT to the seller and the listing NFT to the buyer.

4. If **seller** cancels a listing, the exchange contract refunds the listing NFT back to the seller and deletes the listing record.

5. If **buyer** retracts an offer, the exchange contract refunds the offer NFT back to the buyer and deletes the offer record.

## Technologies

<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/yinbox-architecture.jpg" alt="Architecture">
</p>

**Web Application (UX)**

- The frontend web application is developed in React using the **NextJS** framework. Integrates with NEAR blockchain via the [near-api-js](https://docs.near.org/docs/api/javascript-library) SDK.

**Blockchain Smart Contract**

- **Yinbox Contract**: NEAR Smart Contract writen in AssemblyScript repesenting the exchange contract. This contract is responsible for the marketplace functionalities including listing, offering, transactions and accounts management. See [NFT Exchange Contract functions](#yinbox-app-contract-functions) for functions.

**Yinbox API**

**Off-Chain Database**

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

Refer to the Yinbox NEAR Smart Contract readme for further details on development.
[Yinbox Smart Contract Developer Readme](/contracts/near/README.md)

#### Smart Contracts Functions and Interface

Refer to the Yinbox NEAR Smart Contract readme for further details.
[Yinbox Smart Contract Developer Readme](/contracts/near/README.md)

#### Web and API Quick Start

Refer to the Web Application and API readme for further details on development.
[Web Application Developer Readme](/contracts/web/README.md)

## Screenshots

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/screenshot-mainlanding.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/screenshot-create-listing.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/screenshot-view-listing.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/screenshot-make-offer.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/yinbox-app/main/docs/images/screenshot-view-offers.png" alt="">
</p>
