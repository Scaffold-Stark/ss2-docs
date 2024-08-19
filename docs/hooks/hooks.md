---
sidebar_position: 4
---

# 🛠 Interacting with Your Smart Contracts

Scaffold-Stark 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around Starknet-React, an easy-to-use interface with typescript autocompletions for reading from, writing to, and monitoring events emitted by your smart contracts.

## Using Your Own Contracts

When you want to make use of the contracts you've developed on the `sn-foundry` package, you can run the following command to deploy to `devnet` and generate the ABIs for the hooks to make use of.

```
yarn deploy
```

The command will create a file called `packages/nextjs/contracts/deployedContracts.ts` within the Next.js App, which would be the ABI source-of-truth for the Scaffold Hooks. This enables autocomplete to be activated when you are building the Next.js front-end of the application.

:::tip

Note that `yarn deploy` does not reset the the generated `deployedContracts.ts` file, meaning that any changes that you made to the contract name or any deletion will not be taken into account, as it will only make the new deployment on top of the existing API. To completely start from a fresh state of deployment, you can run (do run with caution):

```
yarn deploy:reset
```

:::

## External Contracts

If you need to interact with external contracts (i.e. not deployed with your SS-2 instance) you can add external contract data to your `packages/nextjs/contracts/preDeployedContracts.ts` file, which would let you use Scaffold-ETH 2 hooks.

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
