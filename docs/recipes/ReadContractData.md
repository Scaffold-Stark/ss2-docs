---
sidebar_position: 6
title: Read Data from a Contract
description: Learn how to read data from a deployed smart contract using the useScaffoldReadContract hook and display it in your UI.
---

# Read Data from a Contract on the Network

This recipe demonstrates how to read data from a smart contract deployed on a network using the [`useScaffoldReadContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldReadContract.ts) hook. You will learn how to read contract data and display it in your dApp's UI.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/GetContractData.tsx"
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export const GetContractData = () => {
  const { address: connectedAddress } = useAccount();

  const { data: contractData, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "yourFunction",
    args: [connectedAddress], // Passing connected account as an argument
  });

  return (
    <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Contract Data</h2>

      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div className="text-sm font-semibold">
          Data: <span>{contractData ? contractData.toString() : "No data available"}</span>
        </div>
      )}
    </div>
  );
};

```
</details>

## Implementation guide

### Step 1: Set Up the Component
Start by creating a new component in your `component` folder of your application. This component will handle the reading of contract data and display it.

```tsx title="components/GetContractData.tsx"
export const ContractReader = () => {
  return (
    <div>
      <h2>Contract Data</h2>
    </div>
  );
};

```

### Step 2: Use the `useScaffoldReadContract` Hook to read data

To read data from the contract, you will use the [`useScaffoldReactContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldReadContract.ts) hook. This hook interacts with the contract, fetches data from a specific function, and can be configured to pass arguments (such as the connected user's account address).

```tsx title="components/GetContractData.tsx"
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export const ContractReader = () => {
  const { address: connectedAddress } = useAccount();

  const { data: contractData, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "yourFunction",
    args: [connectedAddress], // Passing connected account as an argument
  });

  return (
    <div>
      <h2>Contract Data</h2>
      {isLoading ? <span>Loading...</span> : <p>{contractData}</p>}
    </div>
  );
};
```

### Step 3: Display the Contract Data

Once you've fetched the data from the contract, you can display it in the UI. You can check if the data is loading using the isLoading variable and render a spinner or message while the data is being retrieved.

```tsx title="components/GetContractData.tsx"
export const ContractReader = () => {
  const { address: connectedAddress } = useAccount();

  const { data: contractData, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "yourFunction",
    args: [connectedAddress],
  });

  return (
    <div>
      <h2>Contract Data</h2>
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p>{contractData ? contractData.toString() : "No data available"}</p>
      )}
    </div>
  );
};

```

### Step 4: Add Styling and Final Touches

Enhance your component’s appearance with some basic styling to make the UI more user-friendly. You can also format the data and improve its readability.

```tsx title="components/GetContractData.tsx"
export const ContractReader = () => {
  const { address: connectedAddress } = useAccount();

  const { data: contractData, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "yourFunction",
    args: [connectedAddress],
  });

  return (
    <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Contract Data</h2>

      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div className="text-sm font-semibold">
          Data: <span>{contractData ? contractData.toString() : "No data available"}</span>
        </div>
      )}
    </div>
  );
};
```

By following this guide, you have successfully implemented a contract reader in your dApp that fetches and displays data from a deployed contract using the [`useScaffoldReactContract`](https://github.com/Scaffold-Stark/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldReadContract.ts) hook.
