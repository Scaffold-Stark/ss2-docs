---
sidebar_position: 2
title: Write to contract with writeContractAsync button
description: Learn how to create a button that executes the writeContractAsync function to interact with a smart contract.
---

# Write to a Contract with `sendAsync` button using the `useScaffoldWriteContract` hook.

This recipe demonstrates how to create a button for contract interaction using the `useScaffoldWriteContract` hook from Scaffold-Stark.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
"use client";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const SetGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { sendAsync, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, 0n], // `inputAmount` fixed at 0n
  });

  const handleSetGreeting = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error setting greeting", e);
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
      <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
      </button>
    </div>
  );
};

export default SetGreeting;
```

</details>

## Implementation

### Step 1: Set Up Your Component

Create a new component in the `components` folder. This component will display an input field and a button to interact with your smart contract.

```tsx title="components/ContractInteraction.tsx"
"use client";

const SetGreeting = () => {
  return (
    <div>
      <input type="text" placeholder="Enter your greeting" className="input border border-primary" />
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default SetGreeting;
```

### Step 2: Initialize `useScaffoldWriteContract` Hook

Now we'll add state management and initialize the hook for contract interaction:

```tsx title="components/ContractInteraction.tsx"
"use client";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const SetGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { sendAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, 0n], // `inputAmount` fixed at 0n
  });

  const handleSetGreeting = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter your greeting" className="input border border-primary" />
      <button className="btn btn-primary">Send</button>
    </div>
  );
};

export default SetGreeting;
```

### Step 3: Add Input Change Logic and Connect Button

Now we'll connect the input to our state and wire up the button click handler:

```tsx title="components/ContractInteraction.tsx"
"use client";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const SetGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { sendAsync } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, 0n], // `inputAmount` fixed at 0n
  });

  const handleSetGreeting = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error setting greeting", e);
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
      <button className="btn btn-primary" onClick={handleSetGreeting}>
        Submit
      </button>
    </div>
  );
};

export default SetGreeting;
```

### Step 4: Add Loading State

Finally, we'll add loading state handling to improve the user experience:

```tsx title="components/ContractInteraction.tsx"
"use client";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const SetGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { sendAsync, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [greeting, 0n], // `inputAmount` fixed at 0n
  });

  const handleSetGreeting = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error setting greeting", e);
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
      <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
      </button>
    </div>
  );
};

export default SetGreeting;
```
