---
sidebar_position: 4
---

# useEthStarkDeployedContract

This is the hook that wraps the `useDeployedContractInfo` hook from Scaffold-Stark and Scaffold-ETH for both Starknet and Ethereum. Use this hook to fetch details about a deployed smart contract, including the ABI and address.

```ts
const {
  data: deployedContractInfo,
  isLoading: deployedContractLoading,
  error: deployedContractError,
} = useEthStarkDeployedContract({
  eth: { contractName: "YourContract" },
  strk: { contractName: "YourContract" },
});
```

This example retrieves the details of the deployed contract with the specified name and stores the details in the `deployedContractData` object.

## Parameters

| Parameter        | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| **contractName** | `string` | Name of the contract. |

### Return Value

- `data`: Object containing `address` and `abi` of contract.
