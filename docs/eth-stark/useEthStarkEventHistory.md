---
sidebar_position: 3
---

# useEthStarkEventHistory

This is the hook that wraps the `useScaffoldEventHistory` hook from Scaffold-Stark and Scaffold-ETH for both Starknet and Ethereum. This hook allows you to read events from a deployed smart contract.

```ts
const { data, isLoading, error } = useEthStarkEventHistory({
  strk: {
    contractName: "YourContract",
    eventName: "contracts::YourContract::YourContract::GreetingChanged",
    fromBlock: 1n,
    enabled: true,
    watch: true,
  },
  eth: {
    contractName: "YourContract",
    eventName: "GreetingChange",
    fromBlock: 1n,
    enabled: true,
    watch: true,
  },
});
```

This example configures the hook to read events from the `GreetingChange` event of the `YourContract` smart contract, starting from block 1. The hook will watch for new events and refresh the data.

## Configuration

| Parameter                      | Type                  | Description                                                                                                                                                    |
| :----------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **contractName**               | `string`              | Name of the deployed contract to read events from.                                                                                                             |
| **eventName**                  | `string`              | Name of the event to listen for.                                                                                                                               |
| **fromBlock**                  | `bigint`              | The block number to start reading events from.                                                                                                                 |
| **filters** (optional)         | `Record<string, any>` | Filters to be applied to the event `{ [parameterName]: value }`.                                                                                               |
| **blockData** (optional)       | `boolean`             | If true, returns the block data for each event (default: false).                                                                                               |
| **transactionData** (optional) | `boolean`             | If true, returns the transaction data for each event (default: false).                                                                                         |
| **receiptData** (optional)     | `boolean`             | If true, returns the receipt data for each event (default: false).                                                                                             |
| **watch** (optional)           | `boolean`             | If true, the events will be refetched every [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. (default: false). |
| **enabled** (optional)         | `boolean`             | If false, disables the hook from running (default: true).                                                                                                      |

## Return Values

- `data` The event history data, including optional block, transaction, and receipt data if specified.
- `isLoading` A boolean indicating whether the data is currently being loaded.
- `error` An error message if an error occurred while fetching the data.
