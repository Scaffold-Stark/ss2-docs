---
sidebar_position: 13
---


# useNativeCurrencyPrice

Use this hook to fetch and manage the prices of the native currency and the STRK token. The prices are stored in the global state and updated through the `priceService`.

```ts
useNativeCurrencyPrice();
```

## Usage Example

This example demonstrates how to use the `useNativeCurrencyPrice` hook to fetch and display the native and STRK currency prices. The prices are accessed from the global state.

```tsx
import React from "react";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-stark/useNativeCurrencyPrice";
import { useGlobalState } from "~~/services/store/store";

const PriceDisplay = () => {
  const nativeCurrencyPrice = useGlobalState((state) => state.nativeCurrencyPrice);
  const strkCurrencyPrice = useGlobalState((state) => state.strkCurrencyPrice);

  // Initiate price fetching
  useNativeCurrencyPrice();

  return (
    <div>
      <p>Native Currency Price: {nativeCurrencyPrice ?? "Loading..."}</p>
      <p>STRK Currency Price: {strkCurrencyPrice ?? "Loading..."}</p>
    </div>
  );
};

export default PriceDisplay;
```

---

## Configuration

No parameters are required for this hook. It automatically initiates price polling using the `priceService`.


## Return Values

This hook doesn’t return any values directly but updates the global state.

| Global State Field         | Type      | Description                                 |
| :------------------------- | :-------  | :------------------------------------------ |
| **nativeCurrencyPrice**    | `number`  | The current price of the native currency.   |
| **strkCurrencyPrice**      | `number`  | The current price of the STRK token.        |


--- 

## Polling Behavior  

This hook starts a price polling session when it is initialized and stops the polling when the component using it is unmounted. It uses a unique polling ID for the session.  

| Field          | Type       | Description                                            |  
| :------------- | :--------- | :----------------------------------------------------- |  
| **Polling ID** | `string`   | A unique identifier for the polling session.           |  

--- 

## Best Practices

- Use this hook in components where you need to display live price updates for the native and STRK currencies.
- Ensure that the `priceService` is properly configured and the global state is initialized.
- Handle loading and fallback states to improve the user experience.

---

## Error Handling

This hook relies on `priceService` for price updates. Any errors during polling will need to be handled within the `priceService` implementation. To gracefully handle errors in your components:

```tsx
const nativeCurrencyPrice = useGlobalState((state) => state.nativeCurrencyPrice);
const strkCurrencyPrice = useGlobalState((state) => state.strkCurrencyPrice);

if (!nativeCurrencyPrice || !strkCurrencyPrice) {
  return <div>Failed to fetch prices or still loading...</div>;
}
```


