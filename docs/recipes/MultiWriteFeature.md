---
sidebar_position: 5
title: Batching multiple writes to a single transaction
description: Learn how to perform multiple write operations to StarkNet smart contracts simultaneously.
---

# Starknet Multi-Write Feature Recipe

This recipe shows how to perform multiple contract write operations in a single transaction using the [`useScaffoldMultiWriteContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldMultiWriteContract.ts) hook from Scaffold-Stark.

## Overview

In this guide, we will implement a feature that allows writing to multiple contracts or executing multiple transactions in a single action. This is particularly useful when your decentralized application (dApp) requires multiple state changes at once.

This documentation will walk through the code and steps necessary to create a button that triggers the multi-write contract interaction.

<details open>
<summary>Here is full implementation of the mult-write feature:</summary>

```tsx title="components/MultiContractInteraction.tsx"
"use client";

import { useState } from "react";
import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";

const MultiSetData = () => {
  const [inputAmount, setInputAmount] = useState<bigint>(0n);
  const [greeting, setGreeting] = useState<string>("");

  const { data: YourContract } = useScaffoldContract({ contractName: "YourContract" });

  const { sendAsync, isPending } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "Eth",
        functionName: "approve",
        args: [YourContract?.address, BigInt(inputAmount)],
      },
      {
        contractName: "Eth",
        functionName: "transfer",
        args: [YourContract?.address, BigInt(inputAmount)],
      },
      {
        contractName: "YourContract",
        functionName: "set_greeting",
        args: [greeting, BigInt(inputAmount)],
      },
    ],
  });

  const handleSetData = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error in multi-write", e);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your greeting"
        className="input border border-primary"
        onChange={e => setGreeting(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your ETH amount"
        className="input border border-primary"
        onChange={e => {
          setInputAmount(BigInt(Number(e.target.value) * 10 ** 18));
        }}
      />
      <button className="btn btn-primary" onClick={handleSetData} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
      </button>
    </div>
  );
};

export default MultiSetData;
```

</details>

## Implementation Guide

### Step 1: Create a New Component

Create a new component in your `component` folder, named `MultiContractInteraction.tsx`. This component will handle multiple write operations on different contracts

```tsx title="components/MultiContractInteraction.tsx"
export const MultiContractInteraction = () => {
  return <div>Your MultiContractInteraction</div>;
};
```

### Step 2: Import Required Hooks and Utilities

- import the [`useScaffoldMultiWriteContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldMultiWriteContract.ts) from scaffold-stark package to handle multiple contract function calls.
- Use [`
`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/utils/scaffold-stark/notification.tsx) utility to display success or error messages.

```tsx title="components/MultiContractInteraction.tsx"
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
import { notification } from "~~/utils/scaffold-stark";
```

### Step 3: Set Up State Variables

- Use the `useState` hook to track user inputs, `greeting` and `inputAmount`.

```tsx title="components/MultiContractInteraction.tsx"
const [inputAmount, setInputAmount] = useState<bigint>(0n);
const [greeting, setGreeting] = useState<string>("");
```

### Step 4: Configure the [`useScaffoldMultiWriteContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldMultiWriteContract.ts) Hook

- Configure the hook with the necessary contract calls. Here, we call the `setGreeting` and `setInputAmount` functions of `YourContract` and `Eth` in sequence.

```tsx title="components/MultiContractInteraction.tsx"
const { sendAsync, isPending } = useScaffoldMultiWriteContract({
  calls: [
    {
      contractName: "Eth",
      functionName: "approve",
      args: [YourContract?.address, BigInt(inputAmount)],
    },
    {
      contractName: "Eth",
      functionName: "transfer",
      args: [YourContract?.address, BigInt(inputAmount)],
    },
    {
      contractName: "YourContract",
      functionName: "set_greeting",
      args: [greeting, BigInt(inputAmount)],
    },
  ],
});
```

- The `isPending` variable will manage the loading state of the button, and `sendAsync` will handle the contract transaction.

### Step 5: Handle Submission

- Create a `handleSetData` function that triggers the multi-write action. If successful, display a success notification; otherwise, log the error and display a failure message.

```tsx title="components/MultiContractInteraction.tsx"
const handleSetData = async () => {
  try {
    await sendAsync();
    notification("Multi-write successful!", "success");
  } catch (e) {
    console.error("Error in multi-write", e);
    notification("Multi-write failed.", "error");
  }
};
```

### Step 6: Create the UI

- Add inputs for `gretting` and `inputAmount`, and a button to submit the data.
- Disable the button while the transaction is pending.

```tsx
return (
    <div>
      <input
        type="text"
        placeholder="Enter your gretting"
        className="input border border-primary"
        onChange={e =>
          greeting(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your ETH amount"
        className="input border border-primary"
        onChange={(e) => {
          setInputAmount(BigInt(Number(e.target.value) * 10 ** 18));
      />
      <button className="btn btn-primary" onClick={handleSetData} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
      </button>
    </div>
  );
};
```
