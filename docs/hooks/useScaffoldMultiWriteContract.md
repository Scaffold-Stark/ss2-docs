---
sidebar_position: 2
---

# useScaffoldMultiWriteContract

Use this hook to write to state-changing functions of your smart contract.

```ts
const { writeAsync } = useScaffoldMultiWriteContract({
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

This example sends multiple transactions to the specified smart contracts to call the functions with the arguments passed in calls. The `writeAsync` function sends the transactions to the smart contracts.

## Usage Example

```tsx
<button
  className="btn btn-primary"
  onClick={async () => {
    try {
      await writeAsync();
    } catch (e) {
      console.error("Error sending transactions:", e);
    }
  }}
>
  Send Transactions
</button>
```

This example demonstrates how to use the `writeAsync`function to send multiple transactions to the specified smart contracts, calling the functions with the arguments passed in calls.

## Configuration

| Parameter              | Type                 | Description                                                                                                                   |
| :--------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **calls**              | `Array`              | Array of configuration objects for the contract calls. Each object should contain `contractName`, `functionName`, and `args`. |
| **options** (optional) | `InvocationsDetails` | Additional options for the transactions.                                                                                      |

## Call Object Configuration

| Parameter           | Type        | Description                                                                                                      |
| :------------------ | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| **contractName**    | `string`    | Name of the contract to write to.                                                                                |
| **functionName**    | `string`    | Name of the function to call.                                                                                    |
| **args** (optional) | `unknown[]` | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |

You can also pass other arguments accepted by [writeContractAsync from starknet-react](https://starknet-react.com/hooks/mutation/usecontractwrite).

## Return Values

- `writeContractAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from the useContractWrite hook from starknet-react. You can check the [useContractWrite return values](https://starknet-react.com/hooks/mutation/usecontractwrite) for the types.
