---
sidebar_position: 1
---

# useEthStarkReadContract

This is the hook that wraps the `useScaffoldReadContract` hook from Scaffold-Stark and Scaffold-ETH for both Starknet and Ethereum. Use this hook to read public variables and get data from read-only functions of your Starknet and Ethereum smart contracts.

```ts
const { data: totalCounter } = useEthStarkReadContract({
  strk: {
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
  },
  eth: {
    contractName: "YourContract",
    functionName: "userGreetingCounter",
    args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
  },
});
```

This example retrieves the data returned by the `userGreetingCounter` function of the `YourContract` smart contract. Whenever you switch between Starknet and Ethereum networks, the hook will automatically switch between the corresponding contracts. Therefore, the `data` will be updated accordingly.

## Configuration

| Parameter | Type     | Description                                                                                                                                                                                                                        |
| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **strk**  | `object` | Object containing the contractName, functionName, args, and other optional parameters for Starknet. A more detailed description is available [here](https://docs.scaffoldstark.com/hooks/useScaffoldReadContract).                 |
| **eth**   | `object` | Object containing the contractName, functionName, args, and other optional parameters for Ethereum smart contracts. A more detailed description is available [here](https://docs.scaffoldstark.com/hooks/useScaffoldReadContract). |

## Return Values

- The retrieved data is stored in the `data` property of the returned object.
- The extended object includes properties inherited from the `useScaffoldReadContract` hook. You can check the [Scaffold-Stark useScaffoldReadContract return values](https://docs.scaffoldstark.com/hooks/useScaffoldReadContract#return-values) and [Scaffold-ETH useScaffoldReadContract return values](https://docs.scaffoldeth.io/hooks/useScaffoldReadContract#return-values) for the types.
