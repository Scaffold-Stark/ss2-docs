---
sidebar_position: 2
---

# useEthStarkWriteContract

This is the hook that wraps the `useScaffoldWriteContract` hook from Scaffold-Stark and Scaffold-ETH for both Starknet and Ethereum. Use this hook to write to your smart contract by calling state-mutating functions.

```ts
const { writeAsync, isPending: greetingPending } = useEthStarkWriteContract({
  strk: {
    contractName: "YourContract",
    functionName: "updateGreeting",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  },
  eth: {
    contractName: "YourContract",
    functionName: "updateGreeting",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  },
});
```

This example calls the updateGreeting function of the YourContract smart contract.

## Usage Example

```tsx
const { writeAsync, isPending: isUpdateGreetingPending } = useEthStarkWriteContract({
  strk: {
    contractName: "YourContract",
    functionName: "updateGreeting",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  },
  eth: {
    contractName: "YourContract",
    functionName: "updateGreeting",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  },
});

async function handleClick() {
  try {
    await writeAsync();
  } catch (error) {
    console.error(error);
  }
}
```

In this example, the updateGreeting function of the YourContract is called with the specified arguments. The transaction is sent using the `writeAsync` method, which handles the logic for sending the transaction and returns a promise

## Configuration for Starknet

| Parameter                | Type        | Description                                                                                                      |
| :----------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| **contractName**         | `string`    | Name of the contract to write to.                                                                                |
| **functionName**         | `string`    | Name of the function to call.                                                                                    |
| **args** (optional)      | `unknown[]` | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |
| **onSuccess** (optional) | `function`  | Function to call on successful transaction.                                                                      |
| **onError** (optional)   | `function`  | Function to call on error.                                                                                       |

## Configuration for Ethereum

| Parameter              | Type        | Description                                                                                                          |
| :--------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------- |
| **contractName**       | `string`    | Name of the contract to write to.                                                                                    |
| **functionName**       | `string`    | Name of the function to call.                                                                                        |
| **args** (optional)    | `unknown[]` | Array of arguments to pass to the function (if accepts any). Types are inferred from contract's function parameters. |
| **options** (optional) | `object`    | Additional options for the transaction, such as gas and value.                                                       |
| **hooks** (optional)   | `object`    | Additional hooks for handling the transaction such as `onSuccess`, `onError`, `onSettled`.                           |

## Return Values

- The writeAsync method is used to send the write transaction. It returns a promise that resolves when the transaction is confirmed.
- The extended object includes properties inherited from the `useScaffoldWriteContract` hook. You can check the [Scaffold-Stark useScaffoldWriteContract return values](https://docs.scaffoldstark.com/hooks/useScaffoldWriteContract#return-values) and [Scaffold-ETH useScaffoldWriteContract return values](https://docs.scaffoldeth.io/hooks/useScaffoldWriteContract#return-values) for the types.
