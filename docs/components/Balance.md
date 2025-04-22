---
sidebar_position: 2
---

# Balance

The `Balance` component displays the balance of a given Starknet (STRK) address in both its native currency and US dollars (USD). It allows toggling between these two modes and also handles potential errors or loading states.

## Features

- **STRK Balances:** Shows Starknet balances for a given address.
- **USD Conversion:** Option to toggle and display balance in USD, provided the exchange rates are available.
- **Error & Loading States:** Handles network issues, loading delays, and empty address scenarios gracefully.

![Balance Example](/img/Balance.gif) <!-- Update gif here -->

## Import

```tsx
import { Balance } from "~~/components/scaffold-stark";
```

## Usage

```tsx
<Balance address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
```

## Props

| Prop                     | Type      | Default Value | Description                                                                                                               |
| ------------------------ | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **address**              | `string`  | `undefined`   | Address in `0x___` format, it will resolve its Starknet Domain if it has one associated(coming soon).                     |
| **className** (optional) | `string`  | `""`          | Prop to pass additional CSS styling to the component. You can use Tailwind / daisyUI classes like `text-3xl` for styling. |
| **usdMode** (optional)   | `boolean` | `false`       | If true, the balance is displayed in USD. Otherwise, it defaults to STRK. |

## Example

The `Balance` component can be easily customized using Tailwind or daisyUI classes. Here’s a more detailed example of its usage:

```tsx
<Balance address="0x34aA3F359A9D614239015126635CE7732c18fDF3" className="text-lg text-gray-700 mt-4" usdMode={true} />
```

This example showcases how to apply additional styling to the component and enables the USD display mode.

:::info

- The component automatically handles loading states, showing a skeleton loader when the balance is being fetched.
- If the address is invalid or no balance is found, it will show an error message.
  :::
