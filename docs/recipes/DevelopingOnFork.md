---
sidebar_position: 6
title: Working with a Forked Network
description: Learn how to develop and test your dApp using a fork of mainnet network with custom wallets.
---

# Working with a Forked Network
This recipe shows how to run a local fork of mainnet and interact with it using Scaffold Stark's contract hooks.

<details open>
<summary>Here is the complete code for interacting with a forked network:</summary>

```tsx title="components/ForkNetworkInteraction.tsx"
import { useAccount } from "@starknet-react/core";
import { useScaffoldContract, useScaffoldWriteContract } from "~~/hooks/scaffold-stark";
import { notification } from "~~/utils/scaffold-stark";

export const ForkNetworkInteraction = () => {
  const { address } = useAccount();
  
  // Get contract instance
  const { data: contract, isLoading: isContractLoading } = useScaffoldContract({
    contractName: "YourContract",
  });

  // Set up write function
  const { sendAsync: setGreeting, isPending } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: ["Testing Fork!"],
  });

  const handleSetGreeting = async () => {
    try {
      await setGreeting();
      notification.success("Greeting updated!");
    } catch (error) {
      console.error("Error:", error);
      notification.error("Failed to update greeting");
    }
  };

  return (
    <div className="bg-base-300 p-6 rounded-lg max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold mb-4">Fork Network Interaction</h2>
      <div className="space-y-4">
        <div className="text-sm">
          <p>Network: Starknet Devnet (Fork)</p>
          <p>Your Address: {address}</p>
          <p>Contract: {contract?.address}</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleSetGreeting}
          disabled={isPending || isContractLoading}
        >
          {isPending ? "Sending..." : "Test Greeting"}
        </button>
      </div>
    </div>
  );
};
```
</details>

## Implementation Guide

### Step 1: Start the Fork Network
First, start a local fork of mainnet:

```bash title="terminal"
# Start fork
yarn chain --fork-network https://starknet-mainnet.public.blastapi.io/rpc/v0_7

# In a new terminal, deploy contracts
yarn deploy

# Start frontend
yarn start
```

### Step 2: Create Network Interaction Component
Create a new component to interact with your forked network:

```tsx title="components/ForkNetworkInteraction.tsx"
import { useAccount } from "@starknet-react/core";
import { useScaffoldContract } from "~~/hooks/scaffold-stark";

export const ForkNetworkInteraction = () => {
  const { address } = useAccount();
  const { data: contract } = useScaffoldContract({
    contractName: "YourContract",
  });
  // ... rest of the component
};
```

### Step 3: Implement Write Functions
Add contract interactions using `useScaffoldWriteContract`:

```tsx title="components/ForkNetworkInteraction.tsx"
const { sendAsync: setGreeting, isPending } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "set_greeting",
  args: ["Testing Fork!"],
});

const handleSetGreeting = async () => {
  try {
    await setGreeting();
    notification.success("Greeting updated!");
  } catch (error) {
    notification.error("Failed to update greeting");
  }
};
```

### Step 4: Add to Your App Page
Import and use the component in your app:

```tsx title="app/page.tsx"
import { ForkNetworkInteraction } from "../components/ForkNetworkInteraction";

export default function Home() {
  return (
    <div className="container mx-auto">
      <ForkNetworkInteraction />
    </div>
  );
}
```
### Step 5: Testing with Different Wallets

#### Using Burner Wallets
```tsx title="components/BurnerWalletTest.tsx"
import { useBurnerWallet } from "~~/hooks/scaffold-stark";

export const BurnerWalletTest = () => {
  const { connect } = useBurnerWallet();
  
  return (
    <button onClick={connect}>
      Use Burner Wallet
    </button>
  );
};
```

#### Connecting External Wallets
For Argent/Braavos wallets:

```tsx title="components/ExternalWalletConnection.tsx"
import { useConnect } from "@starknet-react/core";

export const ExternalWalletConnection = () => {
  const { connect, connectors } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
};
```
## Testing Different Wallet Types

### 1. Using Burner Wallet
- Automatically funded with test ETH and STRK to cover gas fees.
- Perfect for quick testing
- No external wallet needed

### 2. Using Argent/Braavos
To connect external wallets to your local fork:
1. Open Argent/Braavos wallet
2. Add Custom Network:
   - Network URL: http://localhost:5050
   - Chain ID: 501 (fork network ID)
   - Name: Localhost Fork
3. Connect wallet through the dApp interface

## Using the Fork Environment

Your forked environment provides:
1. A local copy of mainnet for testing
2. Contract read/write capabilities using Scaffold Stark hooks
3. Error handling and transaction notifications
4. Network state verification

### Testing Different Operations

You can test:
- Contract reads using `useScaffoldContract`
- Contract writes using `useScaffoldWriteContract`
- Error cases and network state.