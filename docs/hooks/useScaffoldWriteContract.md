---
sidebar_position: 2
---

# useScaffoldWriteContract

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeAsync: writeYourContractAsync } = useScaffoldContractWrite({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["The value to set"],
});
```

The first argument is name of the contract to write to and the second argument is starknet-react `usecontractwrite` hook [parameters object](https://starknet-react.com/hooks/mutation/usecontractwrite).

## Usage Example

```tsx
<button
  className="btn btn-primary"
  onClick={async () => {
    try {
      await writeYourContractAsync({
        args: ["The new value to set"],
        options: {
          value: parseEther("0.1"),
        },
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  }}
>
  Set Greeting
</button>
```

Below is the configuration for `writeContractAsync` function:

## Configuration

| Parameter                          | Type        | Description                                                                                                          |
| :--------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------- |
| **contractName**                   | `string`    | Name of the contract to write to.                                                                                      |
| **functionName**                | `string` | Name of the function to call.|
| **args** (optional)                | `unknown[]` |Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |
| **options** (optional)                | `objet` | Additional options for the transaction (e.g., value for payable functions).|


You can also pass other arguments accepted by [writeContractAsync from starknet-react](https://starknet-react.com/hooks/mutation/usecontractwrite).

## Return Values

- `writeContractAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from the useContractWrite hook from starknet-react. You can check the [usecontractwrite return values](https://wagmi.sh/react/api/hooks/useWriteContract#return-type) for the types.
