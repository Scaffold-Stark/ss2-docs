---
sidebar_position: 9
---

# useScaffoldEthBalance

Use this hook to read the Ethereum (ETH) balance of a specified address on the StarkNet blockchain.

This example retrieves the ETH balance for the specified address using the deployed Ethereum contract on StarkNet. The returned object includes the raw balance value, the formatted balance, and the ETH symbol.

## Usage Example

```tsx
import useScaffoldEthBalance from "~~/hooks/scaffold-stark/useScaffoldEthBalance";
import { useAccount } from "~~/hooks/useAccount";

function EthBalanceDisplay() {
  const { address } = useAccount();
  const { value, formatted, symbol } = useScaffoldEthBalance({ address: address || "" });

  return (
    <div>
      <h3>ETH Balance:</h3>
      <p>Raw Value: {value ? value.toString() : ""}</p>
      <p>Formatted: {formatted}</p>
      <p>Symbol: {symbol}</p>
    </div>
  );
}
```

This example demonstrates how to use the `useScaffoldEthBalance` hook to display the formatted ETH balance for a user's address.

## Configuration

| Parameter   | Type                | Description                                                                                          |
| :---------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| **address** | `Address \| string` | The Ethereum address to fetch the balance for. If not provided, the balance of the contract is used. |

## Return Values

| Parameter     | Type     | Description                                                                                                      |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------- |
| **value**     | `bigint` | The raw balance fetched from the contract as a `bigint`.                                                         |
| **decimals**  | `number` | Number of decimals for the token. Defaults to `18` for ETH.                                                      |
| **symbol**    | `string` | The token symbol. For this contract, it will return `"ETH"`.                                                     |
| **formatted** | `string` | The balance formatted into a human-readable string using ethers' `formatUnits`. Defaults to `"0"` if no balance. |

## Call Object Configuration

| Parameter           | Type          | Description                                                                    |
| :------------------ | :------------ | :----------------------------------------------------------------------------- |
| **functionName**    | `string`      | Name of the function to call (in this case, `balance_of`).                     |
| **args** (optional) | `unknown[]`   | Arguments to pass to the function, such as the target address.                 |
| **blockIdentifier** | `BlockNumber` | Specifies the block to query the contract from, set as `"pending"` by default. |

You can also pass other arguments accepted by [useReadContract from starknet-react](https://starknet-react.com/docs/hooks/queries/usecontractread).

## Return Values

- **`value`**: Raw balance value in `bigint`.
- **`formatted`**: The balance in human-readable format.
- **`symbol`**: The token symbol ("ETH").
- The object also includes properties from the `useReadContract` hook. You can check the [useContractRead return values](https://starknet-react.com/docs/hooks/queries/usecontractread) for additional details.

## Best Practices

- Use this hook in any component where you need to display the ETH balance of a specific address.
- Ensure that the component using this hook is wrapped in a StarkNet React provider for seamless integration with the blockchain context.
- For a smooth user experience, handle loading and error states in the component using this hook.
- Consider using the formatted balance for display purposes as it is easier for users to understand compared to the raw bigint value.

## Error Handling

The hook does not handle errors explicitly, but the `useReadContract` hook from StarkNet React includes an `error` property in the return object. You can leverage this to manage errors in your component like this:

```tsx
const { value, formatted, symbol, error } = useScaffoldEthBalance({ address });

if (error) {
  return <div>Error fetching ETH balance</div>;
}
```
