---
sidebar_position: 3
---

# AddressInput

Display an Starknet address input that validates the address format, resolves StarknetId domains, and shows their avatars.

Also shows a blockie image for each address.

![AddressInput Example](/img/addressInput.gif)

## Import

```tsx
import { AddressInput } from "~~/components/scaffold-stark";
```

## Usage

```tsx
const [address, setAddress] = useState("");

<AddressInput onChange={setAddress} value={address} placeholder="Input your address" />;
```

## Props

| Prop                       | Type       | Default Value | Description                                                                  |
| -------------------------- | ---------- | ------------- | ---------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | An Starknet address in (`0x___` format) or an StarknetId domain.             |
| **onChange**               | `function` | `undefined`   | A callback invoked when the data in the address input changes.               |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered before address input has been entered.      |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if AddressInput is submitted into a form. |
| **disabled** (optional)    | `boolean`  | `false`       | If `true`, sets the address input un-clickable and unusable.                 |
