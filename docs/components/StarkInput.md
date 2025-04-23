---
sidebar_position: 4
---

# StarkInput

Displays an input field for STRK/USD amount, with an option to convert between STRK and USD.

![StarkInput Example](/img/EtherInput.gif) <!-- Update gif here -->

## Import

```tsx
import { StarkInput } from "~~/components/scaffold-stark";
```

## Usage

```tsx
const [starkAmount, setStarkAmount] = useState("");

<StarkInput value={starkAmount} onChange={amount => setStarkAmount(amount)} />;
```

## Props

| Prop                       | Type       | Default Value | Description                                                                             |
| -------------------------- | ---------- | ------------- | --------------------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | You can enter STRK quantity or USD quantity, but value will always be stored in STRK.   |
| **onChange**               | `function` | `undefined`   | A callback invoked when the amount in the StarkInput changes.                           |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered when there is no input value.                          |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if StarkInput is submitted into a form.              |
| **disabled** (optional)    | `boolean`  | `false`       | When set to `true`, changes input background color and border to have disabled styling. |
