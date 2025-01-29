---
sidebar_position: 1
title: Get the Current Balance of the Connected Account
description: Learn how to display the ETH and STRK balance and address of an account in your dApp.
---

# Get the Current Balance of the Connected Account

This recipe shows how to fetch and display the ETH and STRK balance of the currently connected account.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ConnectedAddressBalance.tsx"
import { useAccount } from "@starknet-react/core";
import { Address, Balance } from "~~/components/scaffold-stark";

export const ConnectedAddressBalance = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Your Balance</h2>

      <div className="text-sm font-semibold mb-2">
        Address: <Address address={connectedAddress} />
      </div>

      <div className="text-sm font-semibold">
        Balance: <Balance address={connectedAddress} />
      </div>
    </div>
  );
};
```

</details>

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the "components" folder of your application.

```tsx title="components/ConnectedAddressBalance.tsx"
export const ConnectedAddressBalance = () => {
  return (
    <div>
      <h2>Your Balance</h2>
    </div>
  );
};
```

### Step 2: Retrieve the Connected Account

Fetch the Starknet address of the currently connected account using the [useAccount starknet-react hook](https://starknet-react.com/hooks/account/useaccount) and easily display them using Scaffold Stark [Address](/components/Address) and [Balance](/components/Balance) components.

```tsx title="components/ConnectedAddressBalance.tsx"
// highlight-start
import { useAccount } from "@starknet-react/core";
import { Address, Balance } from "~~/components/scaffold-stark";
// highlight-end

export const ConnectedAddressBalance = () => {
  // highlight-start
  const { address: connectedAddress } = useAccount();
  // highlight-end

  return (
    <div>
      <h2>Your ETH and STRK Balance</h2>
      {/* highlight-start */}
      Address: <Address address={connectedAddress} />
      Balance: <Balance address={connectedAddress} />
      {/* highlight-end */}
    </div>
  );
};
```
