---
sidebar_position: 5
---

# useEthStarkContract

This is the hook that wraps the `useScaffoldContract` hook from Scaffold-Stark and Scaffold-ETH for both Starknet and Ethereum. Use this hook to get your contract instance by providing the contract name. It enables you to interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useEthStarkReadContract` and `useEthStarkWriteContract`.

```ts
const { data: yourContract, isLoading: yourContractLoading } = useEthStarkContract({
  eth: {
    contractName: "YourContract",
  },
  strk: {
    contractName: "YourContract",
  },
});

// Returns the greeting and can be called in any function, unlike useEthStarkReadContract

// for eth contract
await yourContract?.read.greeting();

// for starknet contract
await yourContract?.greeting();

// Used to write to a contract and can be called in any function
import { useAccount } from "@starknet-react/core";
import { useWalletClient } from "wagmi";

const { account } = useAccount();
const { data: walletClient } = useWalletClient();

const { data: yourContract, isLoading: yourContractLoading } = useEthStarkContract({
  eth: {
    contractName: "YourContract",
    walletClient: walletClient,
  },
  strk: {
    contractName: "YourContract",
    walletClient: account,
  },
});

const setGreeting = async () => {
  // Call the method in any function
  // for eth contract
  await yourContract?.write.setGreeting(["the greeting here"]);

  // for starknet contract
  await yourContract?.setGreeting(["the greeting here"]);
};
```

This example uses the `useEthStarkContract` hook to obtain a contract instance for the `YourContract` smart contract.

## Configuration

| Parameter        | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| **contractName** | `string` | Name of the contract. |

## Return Value

- `data`: An instance of the contract, which can be used to call `read` and `write` methods of the contract.

- `isLoading` : Boolean indicating if the contract is being loaded.
