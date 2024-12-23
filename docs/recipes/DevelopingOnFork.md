```markdown
# Developing on Fork

This guide shows how to run and interact with a local fork of Starknet mainnet.

## Setup

1. Start the fork:
```bash
yarn chain --fork-network https://starknet-mainnet.public.blastapi.io/rpc/v0_7
```

2. Update scaffold.config.ts:
```typescript
const mainnetFork = {
  id: BigInt("0x534e5f4d41494e"),
  network: "devnet",
  name: "Starknet Fork",
  nativeCurrency: {
    address: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:5050/rpc"],
    },
    public: {
      http: ["http://127.0.0.1:5050/rpc"],
    },
  },
} as Chain;

const scaffoldConfig = {
  targetNetworks: [mainnetFork],
  isFork: true,  // handles forked network validation, else might show wrong network.
  // ... other config options remain the same
};
```

## Wallet Configuration

### Using Argent/Braavos
1. Open your wallet
2. Add Custom Network:
   - RPC URL: http://127.0.0.1:5050/rpc
   - Chain ID: 0x534e5f4d41494e
   - Name: Starknet Fork

![image](https://github.com/user-attachments/assets/511b84a1-e232-46b3-a4a4-82c44ad03969)


similiarly for braavos.
if you correctly connected with the devnet correctly, it should show
![image](https://github.com/user-attachments/assets/a684c853-35ed-4042-a415-86744efb36d2)


## Interaction
Navigate to `/debug-ui` to interact with your contracts

## Notes
- Make sure your contract deployment is complete before testing
- The burner wallet is automatically configured with test ETH
- External wallets need to be configured with the correct network settings