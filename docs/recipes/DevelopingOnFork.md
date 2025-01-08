# Developing on Fork

This guide shows how to run and interact with a local fork of Starknet mainnet.

## Setup

1. Start the fork:

```bash
yarn chain --fork-network https://starknet-mainnet.public.blastapi.io/rpc/v0_7
```

2. After running yarn chain fork, there will be a block number in console:

```bash
Forking from block: number=1047693
```

3. If you wanna use events, **MAKE SURE** the fromBlock : is > the number in console + 1, otherwise the events data will always be empty. i.e. do not capture the first block of the fork

```typescript
const { data: events } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "contracts::YourContract::YourContract::GreetingChanged",
  fromBlock: 1028886n, // NOTE : Use the latest block on the fork + 1 ( see the logs in the console)
  watch: true,
});
```

4. Update `scaffoldConfig` in scaffold.config.ts as:

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.mainnetFork],
  // ... other config options
};
```

5. Create a `.env` file from the `.env.example` template and configure it accordingly

```
NEXT_PUBLIC_PROVIDER_URL=http://127.0.0.1:5050
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
