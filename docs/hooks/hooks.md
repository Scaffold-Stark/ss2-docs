---
sidebar_position: 4
---

# 🛠 Interacting with Your Smart Contracts

Scaffold-Stark provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around Starknet-React, an easy-to-use interface with typescript autocompletions for reading from, writing to, and monitoring events emitted by your smart contracts.

If you need to interact with external contracts (i.e. not deployed with your SS-2 instance) you can add external contract data to your `packages/nextjs/contracts/preDeployedContracts.ts` file, which would let you use Scaffold-Stark hooks. You can also use our [external contract fetching tool](/quick-start/configure-contracts) that allows you to bring in external contracts with few simple clicks.

To achieve this, include the contract name, its `address`, and `abi` in `preDeployedContracts.ts` for each chain ID. Ensure to update the [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks) in `scaffold.config.ts` to your preferred chains to enable hooks typescript autocompletion.

This is the structure of `preDeployedContracts` object:

```ts
const preDeployedContracts = {
  devnet: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
  sepolia: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
} as const;
```

:::note

When having multiple chains configured in [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks), make sure to have same contractName's on other chains as `targetNetworks[0].id`.This ensures proper functionality and autocompletion of custom hooks, as the current setup and types assumes that same contract's are present on other chains as `targetNetworks[0]`.

:::
