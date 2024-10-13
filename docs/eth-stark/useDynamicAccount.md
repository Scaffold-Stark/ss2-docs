---
sidebar_position: 6
---

# useDynamicAccount

This is the hook that wraps the `useAccount` hook from starknet-react and wagmi. Use this hook to get your account details.

```ts
const { address } = useDynamicAccount();
```

## Return Value

- `address`: Address of the account.
- `chainId` : Chain id of the account.
- `isConnected` : Boolean indicating if the account is connected.
- `isConnecting` : Boolean indicating if the account is connecting.
- `isDisconnected` : Boolean indicating if the account is disconnected.
- `isReconnecting` : Boolean indicating if the account is reconnecting.
