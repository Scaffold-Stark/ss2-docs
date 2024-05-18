---
sidebar_position: 4
---

# useScaffoldEventHistory

Use this hook to read events from a deployed smart contract.

```ts
const { data, isLoading, error } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "YourEvent",
  fromBlock: BigInt(0),
  filters: { parameterName: value },
  blockData: true,
  transactionData: false,
  receiptData: false,
  watch: true,
  enabled: true,
});
```

This example configures the hook to read events from the YourEvent event of the YourContract smart contract, starting from block 0. It includes block data, but excludes transaction and receipt data. The hook will watch for new events and refresh the data.

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
