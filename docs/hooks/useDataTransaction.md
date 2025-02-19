---
sidebar_position: 11
---

# `useDataTransaction`

Use this hook to fetch, process, and monitor blockchain transaction data from Starknet for a specific block number. It calculates various statistics such as transactions per second (TPS), gas prices, average transaction fees in USD, and many more.

---

## Features

- **Automatic Data Fetching**: Automatically fetches data when the hook is used.
- **TPS Calculation**: Estimates transactions per second based on block timestamps.
- **Average Fee in USD**: Converts transaction fees from Wei to USD using live ETH price data from CoinGecko.
- **Gas Price Metrics**: Retrieves L1 gas price information in both Wei and FRI.
- **Error Handling**: Captures and provides error details if fetching fails.

---

## Usage

This example fetches and monitors data for the specified block,
allowing you to display metrics or manage the data fetching state dynamically.

```tsx
import { useDataTransaction } from "~~/hooks/scaffold-stark/useDataTransaction";

const DataTransaction = ({ blockNumber }: { blockNumber: number }) => {
  const { blockData, error, refetch, isEnabled, toggleFetching } = useDataTransaction(blockNumber);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : blockData ? (
        <>
          <p>Block Number: {blockData.blockNumber}</p>
          <p>Transactions: {blockData.transaction}</p>
          <p>TPS: {blockData.tps}</p>
          <p>Gas Price (ETH): {blockData.gasprice}</p>
          <p>Average Fee (USD): {blockData.averageFeeUSD}</p>
        </>
      ) : (
        <p>Loading block data...</p>
      )}
      <button onClick={toggleFetching}>{isEnabled ? "Pause Fetching" : "Resume Fetching"}</button>
      <button onClick={refetch}>Refetch Data</button>
    </div>
  );
};
```

---

## Parameters

- **`blockNumber`**: `number`  
  The block number for which data should be fetched.

---

## Return Value

The hook returns an object with the following properties:

### 1. `blockData: BlockData | null`

The processed data for the specified block, including:

- **`transaction`**: Total number of transactions in the block.
- **`blockStatus`**: Status of the block.
- **`blockNumber`**: Block number.
- **`blockHash`**: Block hash.
- **`blockVersion`**: Starknet version of the block.
- **`blockTimestamp`**: Timestamp of the block.
- **`blockTransactions`**: List of transactions in the block.
- **`parentBlockHash`**: Hash of the parent block.
- **`totalTransactions`**: Total number of transactions in the block.
- **`tps`**: Transactions per second (calculated if the previous block exists).
- **`gasprice`**: Gas price in Wei for L1 transactions.
- **`gaspricefri`**: Gas price in FRI for L1 transactions.
- **`timeDiff`**: Time difference (in seconds) between the current block and the previous block.
- **`averageFeeUSD`**: Average transaction fee in USD.

### 2. `error: string | null`

An error message if the data fetching fails.

### 3. `refetch: () => void`

A function to refetch the data.

### 4. `isEnabled: boolean`

Indicates whether the automatic fetching is enabled.

### 5. `toggleFetching: () => void`

A function to toggle the automatic fetching of data.

---
