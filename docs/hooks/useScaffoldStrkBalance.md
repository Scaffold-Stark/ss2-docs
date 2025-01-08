---
sidebar_position: 8
---

# useScaffoldStrkBalance

The `useScaffoldStrkBalance` hook is a custom React hook designed to fetch and display the balance of STRK tokens for a given address on the StarkNet blockchain. It simplifies the process of reading contract data by using StarkNet React utilities.

## Usage Example

```ts
import useScaffoldStrkBalance from './hooks/useScaffoldStrkBalance';

const address = "0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8"

function StrkBalanceDisplay({ address }) {
  const { value, formatted, symbol } = useScaffoldStrkBalance({ address: "0x01176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8" });

  return (
    <div>
      <h3>STRK Balance:</h3>
      <p>Raw Value: {value}</p>
      <p>Formatted: {formatted}</p>
      <p>Symbol: {symbol}</p>
    </div>
  );
}
```

This example demonstrates how to use the `useScaffoldStrkBalance` hook to display the raw and formatted STRK token balance for a user's address.

## Configuration

| Parameter   | Type                | Description                                                                                                                         |
| :---------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **address** | `Address \| string` | The STRK address to fetch the balance for. If not provided, it will attempt to fetch the balance for the current connected account. |

## Return Values

| Parameter     | Type     | Description                                                                     |
| :------------ | :------- | :------------------------------------------------------------------------------ |
| **value**     | `bigint` | The raw STRK balance fetched from the contract as a `bigint`.                   |
| **decimals**  | `number` | Number of decimals for the token. Defaults to `18` for STRK.                    |
| **symbol**    | `string` | The token symbol. For this contract, it will return `"STRK"`.                   |
| **formatted** | `string` | The balance formatted into a human-readable string using ethers' `formatUnits`. |
| **error**     | `Error`  | Error object in case there is a failure fetching the balance.                   |

## Best Practices

- Use this hook in components that need to display STRK token balances.
- Ensure that the component using this hook is wrapped in a StarkNet React provider.
- Handle loading and error states appropriately in the parent component.

## Error Handling

While the hook doesn't explicitly handle errors, the returned props object from `useReadContract` includes an error property that can be checked in the parent component.

```ts
const { value, formatted, symbol, error } = useScaffoldStrkBalance({ address });

if (error) {
  return <div>Error fetching STRK balance</div>;
}
```
