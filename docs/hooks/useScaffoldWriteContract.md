---
sidebar_position: 3
---

# useScaffoldWriteContract

Use this hook to write to your smart contract by calling state-mutating functions.

```ts
const { sendAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "updateGreeting",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
});
```

This example calls the updateGreeting function of the YourContract smart contract.

## Usage Example

```tsx
const { sendAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "updateGreeting",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "Hello, world!"],
  options: { gas: 100000 },
});

const handleUpdateGreeting = async () => {
  try {
    const result = await sendAsync();
    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
```

In this example, the updateGreeting function of the YourContract is called with the specified arguments. The transaction is sent using the `sendAsync` method, which handles the logic for sending the transaction and returns a promise

## Configuration

| Parameter           | Type        | Description                                                                                                                                                                                           |
| :------------------ | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **contractName**    | `string`    | Name of the contract to write to.                                                                                                                                                                     |
| **functionName**    | `string`    | Name of the function to call.                                                                                                                                                                         |
| **args** (optional) | `unknown[]` | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. For special datatypes such as `enums`, you can pass in enum types from `starknet.js` |

## Return Values

- The `sendAsync` method is used to send the write transaction. It returns a promise that resolves when the transaction is confirmed.
- The extended object includes properties inherited from the `useSendTransaction` hook of starknet-react. You can check their [documentation](https://www.starknet-react.com/docs/hooks/use-send-transaction#sendasync) for the specific return values.
