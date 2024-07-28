---
sidebar_position: 1
---

# useScaffoldReadContract

Use this hook to read public variables and get data from read-only functions of your smart contract.

```ts
const { data: totalCounter } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "userGreetingCounter",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
});
```

This example retrieves the data returned by the `userGreetingCounter` function of the `YourContract` smart contract.

## Configuration

| Parameter                      | Type          | Description                                                                                                      |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------- |
| **contractName**               | `string`      | Name of the contract to read from.                                                                               |
| **functionName**               | `string`      | Name of the function to call.                                                                                    |
| **args** (optional)            | `unknown[]`   | Array of arguments to pass to the function (if any). Types are inferred from the contract's function parameters. |
| **blockIdentifier** (optional) | `BlockNumber` | Block identifier to use (default: pending).                                                                      |
| **watch** (optional)           | `boolean`     | Watches and refreshes data on new blocks. (default : `true`)                                                     |
| Other arguments                | `various`     | You can pass other arguments accepted by the useContractRead hook from @starknet-react/core.                     |

You can also pass other arguments accepted by [useContractRead from Starknet-react](https://starknet-react.com/hooks/query/usecontractread).

## Return Values

- The retrieved data is stored in the `data` property of the returned object.
- The extended object includes properties inherited from the useContractRead hook of starknet-react. You can check the [useContractRead return values](https://starknet-react.com/hooks/query/usecontractread) documentation for the types.
