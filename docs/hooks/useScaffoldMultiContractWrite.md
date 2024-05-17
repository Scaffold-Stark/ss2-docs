---
sidebar_position: 4
---

# useScaffoldMultiContractWrite

Use this hook to send multiple transactions to your smart contracts to write data or perform actions.

```ts
const { writeAsync: writeMultipleContractsAsync } = useScaffoldMultiContractWrite({
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

This example sends multiple transactions to the specified smart contracts to call the functions with the arguments passed in calls. The writeAsync function (writeMultipleContractsAsync instance) sends the transactions to the smart contracts.

## Usage Example

```tsx
<button
  className="btn btn-primary"
  onClick={async () => {
    try {
      await writeMultipleContractsAsync();
    } catch (e) {
      console.error("Error sending transactions:", e);
    }
  }}
>
  Send Transactions
</button>
```

This example sends multiple transactions to the specified smart contracts to call the functions with the arguments passed in calls. The writeAsync function (writeMultipleContractsAsync instance) sends the transactions to the smart contracts.

## Configuration

| Parameter              | Type                                                          | Description                                                                         |
| :--------------------- | :------------------------------------------------------------ | :---------------------------------------------------------------------------------- |
| **calls**              | `Array<UseScaffoldWriteConfig<TContractName, TFunctionName>>` | An array of calls, each containing the contract name, function name, and arguments. |
| **options** (optional) | `InvocationsDetails`                                          | Additional options for the transactions.                                            |

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
- The extended object includes properties inherited from the useContractWrite hook from starknet-react. You can check the [usecontractwrite return values](https://wagmi.sh/react/api/hooks/useWriteContract#return-type) for the types.
