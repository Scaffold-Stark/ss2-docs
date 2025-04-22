---
sidebar_position: 9
---

# useTransactor

Use this hook to interact with the chain and give UI feedback on the transaction status.

<!-- ![Transaction success](/img/transactorSuccess.gif) Update gif here -->

Any error will instead show a popup with nice error message.

<!-- ![Error Example](/img/transactorFail.gif) update gif here -->

```ts
const { contract: contractInstance } = useContract({
    abi,
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
});
const { writeTransaction, transactionReceiptInstance, sendTransactionInstance } = useTransactor();
await writeTransaction(
    [
        contractInstance.populate(
            abiFunction.name,
            args[],
        ),
    ]
);
```

This example tries to send 1 STRK to the address `0xd8da6bf26964af9d7eed9e03e53415d37aa96045`, prompting the connected [`WalletClient`](https://starknetjs.com/docs/API/classes/AccountInterface/) for a signature. And in the case of a successful transaction, it will show a popup in the UI with the message: "🎉 Transaction completed successfully!".

You can pass in a list of valid `Call` - Type is from `starknet`. It also possible to pass it an additional `withSendTransaction = false` parameter to use manual fee estimate and fallback when estimation fails.

[Refer to this recipe](/recipes/WriteToContractWriteAsyncButton) for a more detailed example.

## Configuration

### useTransactor

| Parameter                     | Type                                                       | Description                                                                                                                                                                       |
| :---------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\_walletClient** (optional) | [`WalletClient`](https://starknetjs.com/docs/API/classes/AccountInterface/) | The wallet client that should sign the transaction. Defaults to the connected wallet client, and is only needed if the transaction is not already sent |

### callback function

| Parameter                                    | Type                                                                                                              | Description                                                                                                                                                                                                                                                                                    |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **tx**                                       | `Call[]` | A list of valid `Call` - Type is from `starknet`. |
| **withSendTransaction** (optional)                       | `boolean` | Default to `true`, set to `false` if you want to use manual fee estimate and fallback when estimation fails.|

## Return Values

### writeTransaction

- The callback function that is used to initialize the UI feedback flow.

### transactionReceiptInstance

- An instance of [useTransactionReceipt](https://www.starknet-react.com/docs/hooks/use-transaction-receipt#usetransactionreceipt) for tracking receipt details.

### sendTransactionInstance
- An instance of [useSendTransaction](https://www.starknet-react.com/docs/hooks/use-send-transaction#usesendtransaction) for tracking transaction status.