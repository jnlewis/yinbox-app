# Yinbox NEAR Smart Contract

## Getting Started

Pre-requisite: [NEAR CLI](https://docs.near.org/docs/tools/near-cli#installation)

#### Login NEAR CLI
Login to NEAR CLI on your local machine. You only need to do this once.
`yarn login`

#### Install dependencies
Clone this repository and run the following commands in terminal from within the repository folder.

`cd contracts/near/yinbox-contract`
`yarn`

#### Build
Build the smart contract.

`yarn build`

#### Deploy to Testnet
Deploy to testnet. Please see `package.json` file to configure the `deploy:testnet` script to deploy to the appropriate account.

`yarn deploy:testnet`

## Interacting With the Contracts

View the files `/packages/near/scripts/yinbox-contract-utils.sh` for preset examples of interacting with the contracts.

##### Yinbox Contract Functions
| Function                  | Description                                                                               | Change/View |
|---------------------------|-------------------------------------------------------------------------------------------|-------------|
| init                      | Initialize the contract with the owner address who can invoke owner only methods.         | Change      |
| owner_set_config_fee      | Sets the minimum fee required for starting a new conversation.                            | Change      |
| owner_delete_conversation | Deletes a given conversation. This is a test method and will be removed before launch.    | Change      |
| owner_set_new_owner       | Sets a new address as the owner who can invoke owner only methods.                        | Change      |
| get_owner                 | Get the current owner address who can invoke owner only methods.                          | View        |
| get_config_fee            | Gets the minumum fee required for starting a conversation.                                | View        |
| get_all_conversations     | Gets all conversations.                                                                   | View        |
| get_conversation          | Gets a conversation by the sender and recipient address.                                  | View        |
| create_conversation       | Creates a new conversation.                                                               | Change      |

**Function Interface**
```
// Initialization
init(owner_id: string): void

// Owner only methods
owner_set_config_fee(fee: u128): void
owner_delete_conversation(conversation_id: i32): void
owner_set_new_owner(new_owner_id: string): void

// Read only methods
get_owner(): string
get_config_fee(): u128
get_all_conversations(): Conversation[]
get_conversation(sender: string, recipient: string): Conversation | null

// Transaction method
create_conversation(recipient: string): void
```

**Models**
```
class Conversation {
  conversation_id: i32;
  participant_a: string;
  participant_b: string;
  created_by: string;
  fee_paid: u128;
  status: string;
}
```
