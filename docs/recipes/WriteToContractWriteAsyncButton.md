---
sidebar_position: 2
title: Write to contract with writeContractAsync button
description: Learn how to create a button that executes the writeContractAsync function to interact with a smart contract.
---

# Write to a Contract with `writeContractAsync` button

This recipe demonstrates how to create a button for contract interaction using the "useTransactor" and "useWriteContract" hooks from the "starknet-react" library. The interaction includes the capability to provide feedback on the transaction status when using starknet-react `useContractWrite`.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark";

export const SetName = () => {
  const [newName, setNewName] = useState("");

  const { writeAsync, isPending } = useScaffoldWriteContract({
    calls: [
      {
        contractName: "YourContract",
        functionName: "setName",
        args: [newName],
      },
    ],
  });

  const handleSetName = async () => {
    try {
      await writeAsync();
    } catch (e) {
      console.error("Error setting name", e);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Write your name"
        className="input border border-primary"
        onChange={e => setNewName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSetName} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
      </button>
    </>
  );
};
```

</details>

## Implementation

### Step 1: Set Up Your Component

Create a new component in the "components" folder. The component will show a button that will allow users to interact with your smart contract.

```tsx title="components/ContractInteraction.tsx"
export const SetName = () => {
  return (
    <>
      <input type="text" placeholder="Write your name" className="input border border-primary" />
      <button>Send</button>
    </>
  );
};
```

### Step 2: Initialize useScaffoldWriteContract hook

Initialize the `useScaffoldWriteContract` hook. This hook provides the `writeAsync` function for sending transactions. We'll create a `handleSetName` function in which we'll call and pass parameters to `writeAsync` required to perform contract interaction.

```tsx
// highlight-start
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark";
// highlight-end

export const SetName = () => {
  // highlight-start
  const [newName, setNewName] = useState("");
  // highlight-end

  // highlight-start
  const { writeAsync } = useScaffoldWriteContract({
    calls: [
      {
        contractName: "YourContract",
        functionName: "setName",
        args: [newName],
      },
    ],
  });
  // highlight-end

  // highlight-start
  const handleSetName = async () => {
    try {
      await writeAsync();
    } catch (e) {
      console.error("Error setting name", e);
    }
  };
  // highlight-end

  return (
    <>
      <input type="text" placeholder="Write your name" className="input border border-primary" />
      <button onClick={handleSetName}>Send</button>
    </>
  );
};
```

### Step 3: Add input change logic and send transaction when users click the button

Wire up the input field to update the `newName` state when the user types in a new name and call the `handleSetName` function when the user clicks the button.

```tsx
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark";

export const SetName = () => {
  const [newName, setNewName] = useState("");

  const { writeAsync } = useScaffoldWriteContract({
    calls: [
      {
        contractName: "YourContract",
        functionName: "setName",
        args: [newName],
      },
    ],
  });

  const handleSetName = async () => {
    try {
      await writeAsync();
    } catch (e) {
      console.error("Error setting name", e);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Write your name"
        className="input border border-primary"
        // highlight-start
        onChange={e => setNewName(e.target.value)}
        // highlight-end
      />
      // highlight-start
      <button className="btn btn-primary" onClick={handleSetName}>
        Send
      </button>
      // highlight-end
    </>
  );
};
```

### Step 4: Bonus - Adding loading state

We can use `isPending` returned from `useScaffoldWriteContract` while the transaction is being mined and also disable the button.

```tsx
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark";

export const SetName = () => {
  const [newName, setNewName] = useState("");
  // highlight-start
  const { writeAsync, isPending } = useScaffoldWriteContract({
    // highlight-end
    calls: [
      {
        contractName: "YourContract",
        functionName: "setName",
        args: [newName],
      },
    ],
  });

  const handleSetName = async () => {
    try {
      await writeAsync();
    } catch (e) {
      console.error("Error setting name", e);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Write your name"
        className="input border border-primary"
        onChange={e => setNewName(e.target.value)}
      />
      // highlight-start
      <button className="btn btn-primary" onClick={handleSetName} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
      </button>
      // highlight-end
    </>
  );
};
```
