---
sidebar_position: 3
---

# useScaffoldWriteContract

Use this hook to write to your smart contract by calling state-mutating functions.

```ts
const { writeAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "updateGreeting",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
});
```

This example calls the updateGreeting function of the YourContract smart contract.

## Usage Example

```tsx
const { writeAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "updateGreeting",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  options: { gas: 100000 },
});

const handleUpdateGreeting = async () => {
  try {
    const result = await writeAsync();
    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
```

In this example, the updateGreeting function of the YourContract is called with the specified arguments. The transaction is sent using the `writeAsync` method, which handles the logic for sending the transaction and returns a promise

## Configuration

| Parameter             | Type        | Description                                                                                                      |
| :-------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| **contractName**      | `string`    | Name of the contract to write to.                                                                                |
| **functionName**      | `string`    | Name of the function to call.                                                                                    |
| **args** (optional)   | `unknown[]` | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |
| **option** (optional) | `object`    | Additional options for the transaction, such as gas and value.                                                   |

You can also pass other arguments accepted by [useContractWrite from Starknet-react](https://starknet-react.com/hooks/mutation/usecontractwrite).

## Return Values

- The writeAsync method is used to send the write transaction. It returns a promise that resolves when the transaction is confirmed.
- The extended object includes properties inherited from the useContractWrite hook of starknet-react. You can check the [useContractWrite return values](https://starknet-react.com/hooks/mutation/usecontractwrite) documentation for the types.
