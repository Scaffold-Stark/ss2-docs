---
sidebar_position: 6
title: Integrating Cartridge Controller
description: Comprehensive guide to integrating the Cartridge Controller in Scaffold-Stark
---

# Integrating the Cartridge Controller

## Overview

This guide provides a complete implementation for integrating the [Cartridge Controller](https://docs.cartridge.gg/controller/overview) into your Scaffold-Stark project, enabling advanced wallet connections.

## Prerequisites and Deployment Considerations

### Important Deployment Requirements

⚠️ **Crucial Notes Before Implementation**:

**Local Development Limitations**

- The Cartridge Controller cannot be used in localhost environments without relying on ngrok or other alternatives. Additionally, developers must use Katana or [Slot](https://docs.cartridge.gg/slot/getting-started).
- This guide focuses only on Sepolia and Mainnet deployments and integration with Vercel.

## Implementation Guide

### Step 1: Add Controller Dependency

Update your `packages/nextjs/package.json` to include the Cartridge dependency:

<details open>
<summary>Add dependencies controller </summary>

```json title="nextjs/package.json"
{
  "dependencies": {
    "@cartridge/connector": "^0.5.7"
  }
}
```

</details>

### Step 2: Create Controller Configuration

Create a new file `index.tsx` in `nextjs/services/web3/controller/index.tsx`. You can also review different configurations in the [Cartridge Controller documentation](https://docs.cartridge.gg/controller/overview) to understand how to integrate [policies or sessions](https://docs.cartridge.gg/controller/sessions) and other powerful features, especially for gaming or UX improvements.

<details>
<summary>View full code</summary>

```tsx title="utils/scaffold-stark/controller.tsx"
"use client";

import { Chain } from "@starknet-react/chains";
import { jsonRpcProvider, publicProvider, starknetChainId, InjectedConnector } from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { constants } from "starknet";
import scaffoldConfig from "~~/scaffold.config";
import { SessionPolicies } from "@cartridge/controller";

// Standard contract addresses
export const ETH_CONTRACT_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const STRK_CONTRACT_ADDRESS = "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D";

// Function to check for devnet networks
const containsDevnet = (networks: readonly Chain[]) => {
  return networks.some(it => it.network === "devnet");
};

// Provider configuration based on Scaffold settings
export const getProvider = () => {
  if (scaffoldConfig.rpcProviderUrl === "" || containsDevnet(scaffoldConfig.targetNetworks)) {
    return publicProvider();
  }

  return jsonRpcProvider({
    rpc: () => ({
      nodeUrl: scaffoldConfig.rpcProviderUrl,
      chainId: starknetChainId(scaffoldConfig.targetNetworks[0].id),
    }),
  });
};

// Supported chains configuration
const chains = [
  {
    id: constants.StarknetChainId.SN_SEPOLIA,
    name: "Sepolia",
    rpcUrl: process.env.NEXT_PUBLIC_RPC_SEPOLIA ?? "https://api.cartridge.gg/x/starknet/sepolia",
  },
  {
    id: constants.StarknetChainId.SN_MAIN,
    name: "Mainnet",
    rpcUrl: process.env.NEXT_PUBLIC_RPC_MAINNET ?? "https://api.cartridge.gg/x/starknet/mainnet",
  },
];

// Session policies for contracts
const policies: SessionPolicies = {
  contracts: {
    [ETH_CONTRACT_ADDRESS]: {
      methods: [
        { name: "approve", entrypoint: "approve" },
        { name: "transfer", entrypoint: "transfer" },
      ],
    },
    [STRK_CONTRACT_ADDRESS]: {
      methods: [
        { name: "approve", entrypoint: "approve" },
        { name: "transfer", entrypoint: "transfer" },
      ],
    },
  },
};

// Create Cartridge Controller instance
export const controllerInstance = new ControllerConnector({
  policies,
  defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
  chains: chains,
  url: process.env.NEXT_PUBLIC_KEYCHAIN_DEPLOYMENT_URL,
  profileUrl: process.env.NEXT_PUBLIC_PROFILE_DEPLOYMENT_URL,
}) as unknown as InjectedConnector;
```

</details>

### Step 3: Modify Connectors Configuration

Update `services/web/connectors.tsx` to include the Cartridge Controller instance.

<details>
<summary>View changes</summary>

```tsx title="nextjs/services/web/connectors.tsx"
import { controllerInstance } from "~~/services/web3/controller/index";

// Add Cartridge Controller for non-devnet networks
if (!targetNetworks.some(network => (network.network as string) === "devnet")) {
  connectors.push(controllerInstance as unknown as InjectedConnector);
}
```

</details>

### Step 4: Configure Deployment Settings

#### Update Network Configuration

Modify `scaffold.config.ts` to target `sepolia` or `mainnet`:

```typescript title="scaffold.config.ts"
const scaffoldConfig = {
  targetNetworks: [chains.sepolia],
};
```

#### Prepare for Deployment

To deploy your application, install Vercel and log in:

```bash
yarn install -g vercel
vercel login
yarn vercel
```

If you want to deploy without pre-checks, use:

```bash
yarn vercel:yolo
```

For more details, refer to the [Vercel deployment guide](https://docs.scaffoldstark.com/deploying/deploy-nextjs-app). If you need to disable type linting checks, see [Disabling Type Checks](https://docs.scaffoldstark.com/disable-type-linting-error-checks).
