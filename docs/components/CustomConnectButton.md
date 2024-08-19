---
sidebar_position: 7
---

# CustomConnectButton

Scaffold-Stark uses a custom _"Connect Button"_, that is enhanced with several useful features:

- **Balance Display**: Shows the balance of the native token from the connected address.
- **Chain Name and Color**: Displays the name of the connected blockchain and uses a distinct color for each chain.
- **Custom Modal**: Includes copy address feature, view its QR code, access address details in blockexplorer, and disconnect.

You can extend this component to suit your app's needs.

![CustomConnectButton Example](/img/customConnectButton.png)

## Import

```tsx
import { CustomConnectButton } from "~~/components/scaffold-stark";
```

## Usage

```tsx
<CustomConnectButton />
```
