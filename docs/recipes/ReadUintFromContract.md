---
sidebar_position: 3
title: Read a uint from a contract
description: Learn how to read from contract functions which accept arguments / no arguments and display them on UI.
---

# Read a `uint` from a contract

This recipe demonstrates how to read data from contract functions and display it on the UI. We'll showcase an example that accepts arguments (parameters) and another with no arguments at all.

<details open>
<summary>Here is the full code, which we will implement in the guide below:</summary>

```tsx title="components/Greetings.tsx"
"use client";

import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Greetings = () => {
  const { data: YourContract } = useScaffoldContract({ contractName: "YourContract" });

  const { data: currentGreeting, isLoading: isCurrentGreetingLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: strkBalance, isLoading: isStrkBalanceLoading } = useScaffoldReadContract({
    contractName: "Strk",
    functionName: "balance_of",
    args: [YourContract?.address],
  });

  return (
    <div className="m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md w-64 text-black">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Greetings</h2>
        <div className="my-4">
          <h3 className="font-medium">Balance STRK in YourContract:</h3>
          {isStrkBalanceLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p>{strkBalance ? (Number(strkBalance) / 10 ** 18).toFixed(6) : "0.000000"} STRK</p>
          )}
        </div>
        <div className="my-4">
          <h3 className="font-medium">New Greeting:</h3>
          {isCurrentGreetingLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p>{currentGreeting ? currentGreeting.toString() : "No greeting"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Greetings;
```

</details>

## Implementation guide

### Step 1: Create a new Component

Begin by creating a new component in the `components` folder of your application.

```tsx title="components/Greetings.tsx"
const Greetings = () => {
  return (
    <div>
      <h3 className="font-medium">Balance STRK in YourContract:</h3>
      <h3 className="font-medium">New Greeting:</h3>
    </div>
  );
};
export default Greetings;
```

### Step 2: Retrieve New Greetings

Initialize the [`useScaffoldReadContract`](/hooks/useScaffoldReadContract) hook to read from the contract. This hook provides the `data` which contains the return value of the function.

```tsx title="components/Greetings.tsx"
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Greetings = () => {
  const { data: currentGreeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  return (
    <div>
      <h3 className="font-medium">New Greeting:</h3>
      <p>{currentGreeting ? currentGreeting.toString() : "No greeting"}</p>
    </div>
  );
};
```

In the line `const {data: currentGreeting} = useScaffoldReadContract({...})`, we use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to extract the `data` field and rename it as `currentGreeting`.

The contract function returns a `uint`, which is represented as a [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) in JavaScript. You can convert it to a readable string using `.toString()`.

### Step 3: Retrieve STRK Balance in YourContract

We can retrieve the STRK balance of the contract by first getting its address using `useScaffoldContract`. Then, we pass this address as an argument (`args`) to `useScaffoldReadContract`, which will call the contract function.

```tsx title="components/Greetings.tsx"
import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Greetings = () => {
  const { data: YourContract } = useScaffoldContract({ contractName: "YourContract" });

  const { data: strkBalance } = useScaffoldReadContract({
    contractName: "Strk",
    functionName: "balance_of",
    args: [YourContract?.address],
  });

  return (
    <div>
      <h3 className="font-medium">Balance STRK in YourContract:</h3>
      <p>{strkBalance ? (Number(strkBalance) / 10 ** 18).toFixed(6) : "0.000000"} STRK</p>
    </div>
  );
};
```

### Step 4: Handling Loading State

We can use the `isLoading` flag returned from `useScaffoldReadContract` to show a loading spinner while fetching data from the contract.

```tsx title="components/Greetings.tsx"
import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Greetings = () => {
  const { data: YourContract } = useScaffoldContract({ contractName: "YourContract" });

  const { data: currentGreeting, isLoading: isCurrentGreetingLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { data: strkBalance, isLoading: isStrkBalanceLoading } = useScaffoldReadContract({
    contractName: "Strk",
    functionName: "balance_of",
    args: [YourContract?.address],
  });

  return (
    <div className="m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md w-64 text-black">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Greetings</h2>
        <div className="my-4">
          <h3 className="font-medium">Balance STRK in YourContract:</h3>
          {isStrkBalanceLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p>{strkBalance ? (Number(strkBalance) / 10 ** 18).toFixed(6) : "0.000000"} STRK</p>
          )}
        </div>
        <div className="my-4">
          <h3 className="font-medium">New Greeting:</h3>
          {isCurrentGreetingLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p>{currentGreeting ? currentGreeting.toString() : "No greeting"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Greetings;
```
