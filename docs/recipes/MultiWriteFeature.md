---
sidebar_position: 5
title: Starknet Multi-Write Feature Recipe
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
import { useState } from "react";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark";
import { notification } from "~~/utils/scaffold-stark";

export const MultiSetData = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const { sendAsync, isPending } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "ProfileContract",
        functionName: "setName",
        args: [name],
      },
      {
        contractName: "ProfileContract",
        functionName: "setAge",
        args: [age],
      },
    ],
  });

  const handleSetData = async () => {
    try {
      await sendAsync();
      notification("Multi-write successful!", "success");
    } catch (e) {
      console.error("Error in multi-write", e);
      notification("Multi-write failed.", "error");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        className="input border border-primary"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter your age"
        className="input border border-primary"
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <button
        className="btn btn-primary"
        onClick={handleSetData}
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

```
</details>

## Implementation Guide

### Step 1: Create a New Component

Create a new component in your `component` folder, named `MultiContractInteraction.tsx`. This component will handle multiple write operations on different contracts


```tsx title="components/MultiContractInteraction.tsx"
export const MultiContractInteraction = () => {
	return <div>Your MultiContractInteraction</div>
}
```

### Step 2: Import Required Hooks and Utilities

- import the [`useScaffoldMultiWriteContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldMultiWriteContract.ts) from scaffold-stark package to handle multiple contract function calls.
- Use [`
`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/utils/scaffold-stark/notification.tsx) utility to display success or error messages.

```tsx title="components/MultiContractInteraction.tsx"
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark";
import { notification } from "~~/utils/scaffold-stark";
```

### Step 3: Set Up State Variables

- Use the `useState` hook to track user inputs, `name` and `age`.

```tsx title="components/MultiContractInteraction.tsx"
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

### Step 4: Configure the [`useScaffoldMultiWriteContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldMultiWriteContract.ts) Hook

- Configure the hook with the necessary contract calls. Here, we call the `setName` and `setAge` functions of `ProfileContract` in sequence.

```tsx title="components/MultiContractInteraction.tsx"
const { sendAsync, isPending } = useScaffoldMultiWriteContract({
  calls: [
    {
      contractName: "ProfileContract",
      functionName: "setName",
      args: [name],
    },
    {
      contractName: "ProfileContract",
      functionName: "setAge",
      args: [age],
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
- Add inputs for `name` and `age`, and a button to submit the data.
- Disable the button while the transaction is pending.

```tsx
return (
  <div>
    <input
      type="text"
      placeholder="Enter your name"
      className="input border border-primary"
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="number"
      placeholder="Enter your age"
      className="input border border-primary"
      onChange={(e) => setAge(Number(e.target.value))}
    />
    <button
      className="btn btn-primary"
      onClick={handleSetData}
      disabled={isPending}
    >
      {isPending ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Submit"
      )}
    </button>
  </div>
);
```
