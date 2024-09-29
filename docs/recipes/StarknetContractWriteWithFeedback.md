---
sidebar_position: 4
title: Starknet-react useSendTransaction with transaction status
description: Show feedback on transaction status to user by `useSendTransaction` along with `useTransactor`
---

# Starknet `useSendTransaction` with transaction status

This recipe demonstrates how to create a button for contract interaction using the `useTransactor` and `useSendTransaction` hooks from the "starknet-react" library. The interaction includes the capability to provide feedback on the transaction status when using starknet-react `useSendTransaction`.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { erc20ABI } from "./erc20";
import { useTransactor } from "~~/hooks/useTransactor";

export const ContractInteraction = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
  }, [contract, address]);

  const { sendAsync, isPending } = useContractWrite({
    calls,
  });

  const writeTx = useTransactor();

  const handleTransfer = async () => {
    try {
      await writeTx(() => sendAsync());
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleTransfer} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
  );
};
```

</details>

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder. The component will show a button that will allow users to interact with your smart contract.

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";

export const ContractInteraction = () => {
  return <button>Send</button>;
};
```

### Step 2: Configure starknet-react `useContractWrite` hook

Add the `useContractWrite` hook and configure it with the required parameters.

```tsx
import * as React from "react";
// highlight-end
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { erc20ABI } from "./erc20";
// highlight-end

export const ContractInteraction = () => {
  // highlight-start
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
  }, [contract, address]);

  const { sendAsync, data, isPending } = useContractWrite({
    calls,
  });
  // highlight-end

  return <button>Send</button>;
};
```

### Step 3: Initialize `useTransactor` hook and send transaction

Initialize the `useTransactor` hook and use it to wrap the `sendAsync` function obtained from `useContractWrite` to provide feedback on the transaction status to the user.

```tsx
import * as React from "react";
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { erc20ABI } from "./erc20";
// highlight-start
import { useTransactor } from "~~/hooks/useTransactor";
// highlight-end

export const ContractInteraction = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
  }, [contract, address]);

  const { sendAsync, data, isPending } = useContractWrite({
    calls,
  });

  // highlight-start
  const writeTx = useTransactor();
  // highlight-end

  return <button onClick={() => writeTx(() => sendAsync())}>Transfer</button>;
};
```

### Step 4: Wrap `useTransactor` in a handler async function

Wrap the `writeTx` function in a handler function to start the transaction when the user clicks the button.

```tsx
import * as React from "react";
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { erc20ABI } from "./erc20";
import { useTransactor } from "~~/hooks/useTransactor";

export const ContractInteraction = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
  }, [contract, address]);

  const { sendAsync, data, isPending } = useContractWrite({
    calls,
  });

  const writeTx = useTransactor();
  // highlight-start
  const handleTransfer = async () => {
    try {
      await writeTx(() => sendAsync());
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };
  // highlight-end

  return (
    // highlight-start
    <button className="btn btn-primary" onClick={handleTransfer}>
      Transfer
    </button>
    // highlight-end
  );
};
```

### Step 5: Bonus adding loading state

We can use `isPending` returned from `useContractWrite` while the transaction is being mined and also `disable` the button.

```tsx
import * as React from "react";
import { useAccount, useNetwork, useContractWrite, useContract } from "@starknet-react/core";
import { erc20ABI } from "./erc20";
import { useTransactor } from "~~/hooks/useTransactor";

export const ContractInteraction = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { contract } = useContract({
    abi: erc20ABI,
    address: chain.nativeCurrency.address,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
  }, [contract, address]);
  // highlight-start
  const { sendAsync, isPending } = useContractWrite({
    calls,
  });
  // highlight-start

  const writeTx = useTransactor();

  const handleTransfer = async () => {
    try {
      await writeTx(() => sendAsync());
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    // highlight-start
    <button className="btn btn-primary" onClick={handleTransfer} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
    // highlight-end
  );
};
```
