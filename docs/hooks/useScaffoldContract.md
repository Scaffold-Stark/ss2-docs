---
sidebar_position: 6
---

# useScaffoldContract

Use this hook to get your contract instance by providing the contract name. It enables you to interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useScaffoldReadContract` and `useScaffoldWriteContract`.

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// Returns the greeting and can be called in any function, unlike useScaffoldReadContract
await yourContract?.read.greeting();

// Used to write to a contract and can be called in any function
import { useAccount } from "@starknet-react/core";

const { account } = useAccount();
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
  account,
});
const setGreeting = async () => {
  // Call the method in any function
  await yourContract?.write.setGreeting(["the greeting here"]);
};
```

This example uses the `useScaffoldContract` hook to obtain a contract instance for the `YourContract` smart contract.

## Configuration

| Parameter        | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| **contractName** | `string` | Name of the contract. |

## Return Value

- `data`: An instance of the contract, which can be used to call `read` and `write` methods of the contract.

- `isLoading` : Boolean indicating if the contract is being loaded.
