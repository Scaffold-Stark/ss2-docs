---
sidebar_position: 2
---

# useScaffoldMultiWriteContract

Use this hook to batch-write multiple transactions to your smart contract.

```ts
const { sendAsync } = useScaffoldMultiWriteContract({
  calls: [
    {
      contractName: "YourContract1",
      functionName: "setGreeting",
      args: ["Hello"],
    },
    {
      contractName: "YourContract2",
      functionName: "setCounter",
      args: [42],
    },
  ],
});
```

This example sends multiple transactions to the specified smart contracts to call the functions with the arguments passed in calls. The `sendAsync` function sends the transactions to the smart contracts.

## Usage Example

```tsx
const { sendAsync } = useScaffoldMultiWriteContract({
  calls: [
    {
      contractName: "YourContract1",
      functionName: "setGreeting",
      args: ["Hello"],
    },
    {
      contractName: "YourContract2",
      functionName: "setCounter",
      args: [42],
    },
  ],
});

<button
  className="btn btn-primary"
  onClick={async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error sending transactions:", e);
    }
  }}
>
  Send Transactions
</button>;
```

This example demonstrates how to use the `sendAsync`function to send multiple transactions to the specified smart contracts, calling the functions with the arguments passed in calls.

## Configuration

| Parameter              | Type                 | Description                                                                                                                                                                                                        |
| :--------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **calls**              | `Calldata[]`         | Array of configuration objects for the contract calls. Each object should contain `contractName`, `functionName`, and `args`. For special datatypes such as `enums`, you can pass in enum types from `starknet.js` |
| **options** (optional) | `InvocationsDetails` | Additional options for the transactions.                                                                                                                                                                           |

## Call Object Configuration

| Parameter           | Type        | Description                                                                                                      |
| :------------------ | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| **contractName**    | `string`    | Name of the contract to write to.                                                                                |
| **functionName**    | `string`    | Name of the function to call.                                                                                    |
| **args** (optional) | `unknown[]` | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |

You can also pass other arguments accepted by [useSendTransaction#sendAsync from starknet-react](https://www.starknet-react.com/docs/hooks/use-send-transaction#sendasync).

## Return Values

- `sendAsync` function sends the transaction(s) to the smart contract.
