---
sidebar_position: 7
---

# useEthStarkTargetNetwork

This is the hook that wraps the `useTargetNetwork` hook from Scaffold-Stark and Scaffold-ETH. Use this hook to get the current connected network.

```ts
const targetNetwork = useEthStarkTargetNetwork();
```

## Return Value

- `targetNetwork`: Current connected network with details such as chainId, name, nativeCurrency, rpcUrls, blockExplorers, etc.
