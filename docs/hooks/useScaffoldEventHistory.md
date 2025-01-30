---
sidebar_position: 4
---

# useScaffoldEventHistory

Use this hook to read events from a deployed smart contract.

```ts
const { data, isLoading, error } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "YourEvent",
  fromBlock: BigInt(0),
  filters: { parameterName: value },
  blockData: true,
  transactionData: false,
  receiptData: false,
  watch: true,
  enabled: true,
});
```

This example configures the hook to read events from the `YourEvent` event of the `YourContract` smart contract, starting from block 0. It includes block data, but excludes transaction and receipt data. The hook will watch for new events and refresh the data.

## Configuration

| Parameter                      | Type                  | Description                                                                                                                                                    |
| :----------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **contractName**               | `string`              | Name of the deployed contract to read events from.                                                                                                             |
| **eventName**                  | `string`              | Name of the event to listen for.                                                                                                                               |
| **fromBlock**                  | `bigint`              | The block number to start reading events from.                                                                                                                 |
| **filters** (optional)         | `Record<string, any>` | Filters to be applied to the event `{ [parameterName]: value }`.                                                                                               |
| **blockData** (optional)       | `boolean`             | If true, returns the block data for each event (default: false).                                                                                               |
| **transactionData** (optional) | `boolean`             | If true, returns the transaction data for each event (default: false).                                                                                         |
| **receiptData** (optional)     | `boolean`             | If true, returns the receipt data for each event (default: false).                                                                                             |
| **watch** (optional)           | `boolean`             | If true, the events will be refetched every [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. (default: false). |
| **enabled** (optional)         | `boolean`             | If false, disables the hook from running (default: true).                                                                                                      |

## Return Values

- `data` The event history data, including optional block, transaction, and receipt data if specified.
- `isLoading` A boolean indicating whether the data is currently being loaded.
- `error` An error message if an error occurred while fetching the data.

## Filters

Filters can only be applied to event keys, which are event fields annotated with `#[key]`. For example, consider an event defined in a contract as follows:

```rust
#[derive(Drop, starknet::Event)]
struct GreetingChanged {
  #[key]
  setter: ContractAddress,
  #[key]
  event_type: u256,
  new_greeting: ByteArray,
}
```

The event data will include a `keys` array:

```javascript
[
  // The first element is the hash of the event name.
  "0x30a5b63b12d63c3c34bd7145a56f903aa6e641b727d42ff159af4372c62e008",
  // The second element is the serialized result of the first key `setter`.
  "0x65dc4a1c484bcde864e7eebc55f033f2baf57dc6e2f4eae14c6860836cfcd0e",
  // The third and fourth elements are the serialized results of the second key `event_type`.
  "0x2703",
  "0x0",
];
```

> For serialization reference, see: https://docs.starknet.io/architecture-and-concepts/smart-contracts/serialization-of-cairo-types/#additional_resources

Here is an example of how to use `filters`, where the key corresponds to the event variable name:

```javascript
useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "contracts::YourContract::YourContract::GreetingChanged",
  fromBlock: 0n,
  filters: {
    setter: "0x00daC9BCF0bC21a9f3483D47A8Ade4764EE5c0377B3bCDDf2df477E3C1e55810",
    event_type: 9987n,
  },
});
```

In this example, we added two filters. The hook will then send an RPC request to the target network with these filter parameters. The response will only include the events that match the filters. (setter is `0x00daC9BCF0bC21a9f3483D47A8Ade4764EE5c0377B3bCDDf2df477E3C1e55810` and event_type is `9987n`).

| Cairo Type                                    | TS Type           |
| :-------------------------------------------- | :---------------- |
| ContractAddress/EthAddress/ClassHash          | `string`          |
| bool                                          | `boolean`         |
| u8/u16/u32/u64/u128/u256/u512/bytes31/felt252 | `bigint`          |
| Option                                        | `CairoOption`     |
| enum                                          | `CairoCustomEnum` |
| struct                                        | `Object`          |

> How to define the complex type you can reference the example below

**Key Points to Consider**

1. Filter Keys: The keys in the `filters` object must correspond to event fields annotated with `#[key]`.
2. Filter Values: The value of a filter can be an array, meaning the event value can match any element in the array. For example:

```javascript
{
  setter: [
    "0x00daC9BCF0bC21a9f3483D47A8Ade4764EE5c0377B3bCDDf2df477E3C1e55810",
    "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  ];
}
```

3. Handling Variable-Length Event Keys: For events with variable-length keys annotated with #[key], such as new_greeting in the GreetingChanged event:

```rust
#[derive(Drop, starknet::Event)]
struct GreetingChanged {
  #[key]
  setter: ContractAddress,
  #[key]
  event_type: u256,
  #[key]
  new_greeting: ByteArray,
  #[key]
  bool_val: bool,
  #[key]
  size_val: u128,
}
```

During serialization, keys are serialized in the order they are defined in the event. When applying filters, if new_greeting is not provided but bool_val and size_val are, these filter conditions will be ignored.

Then let's see a more complex example. the event defined with complex data type.

```rust
#[derive(Drop, starknet::Event)]
struct GreetingChanged {
  #[key]
  greeting_setter: ContractAddress,
  #[key]
  new_greeting: ByteArray,
  #[key]
  event_type: u256,
  premium: bool,
  value: u256,
  #[key]
  addresses: Array<ContractAddress>,
  arr: Array<u256>,
  #[key]
  tup: (u32, u64, bool, ContractAddress),
  #[key]
  st: SomeStruct,
  #[key]
  enum_val: SomeEnum,
  #[key]
  bool_val: bool,
}
```

If we want to add all the filters, the hook definition will be:

```javascript
useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "contracts::YourContract::YourContract::GreetingChanged",
  fromBlock: 0n,
  filters: {
    greeting_setter: "0x00daC9BCF0bC21a9f3483D47A8Ade4764EE5c0377B3bCDDf2df477E3C1e55810",
    new_greeting: "hello world",
    event_type: 9987n,
    addresses: [
      "0x00daC9BCF0bC21a9f3483D47A8Ade4764EE5c0377B3bCDDf2df477E3C1e55810",
      "0x065Dc4A1C484bcde864e7eEBc55F033F2BAF57dc6e2f4eaE14c6860836CFcd0E",
    ],
    tup: {
      0: 1n,
      1: 2n,
      2: true,
      3: caller,
    },
    st: {
      addr: new CairoOption(CairoOptionVariant.Some, caller),
      val: new CairoOption(CairoOptionVariant.None),
    },
    enum_val: new CairoCustomEnum({
      val1: new CairoCustomEnum({
        val1: 12,
      }),
    }),
    bool_val: true,
  },
});
```

Please pay attention to how tuples, structs, and enum types are defined on the web side.

> There is a limitation on the filter count. The count here refers to the number of elements in the serialization result of the filter object. The maximum allowed count is 16.
