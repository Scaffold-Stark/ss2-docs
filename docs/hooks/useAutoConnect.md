---
sidebar_position: 12
---

# useAutoConnect

Use this hook to automatically connect the user to a previously used wallet or connector based on configuration settings and prior connection data stored in local storage. This enhances the user experience by reconnecting seamlessly without manual intervention.

---

## **Features**
- **Auto-connect Configuration**: Uses the `scaffoldConfig.walletAutoConnect` flag to determine if auto-connect should occur.
- **TTL Check**: Ensures the connection is only re-established if the configured TTL (`autoConnectTTL`) has not expired.

---

### **Usage**

This hook is typically used globally in your application, such as in a provider or a high-level component, 
to handle automatic wallet reconnections:

```tsx
import { useAutoConnect } from "~~/hooks/scaffold-stark"

const ScaffoldStarkApp = () => {
  useAutoConnect();

  return <YourAppComponents />;
};
```

By calling `useAutoConnect`, the application will attempt to reconnect to the last used wallet if the `walletAutoConnect` feature is set to `true` in `scaffold.config.ts` and the time-to-live (TTL) has not expired.

---

### **How It Works**

1. **Local Storage**: Reads the last used connector and connection timestamp from local storage:
- `lastUsedConnector`: Stores the ID of the last used wallet connector.
- `lastConnectedTime`: Stores the timestamp of the last successful connection.

2. **Connector Matching**: Attempts to find the previously used connector from the available connectors.

3. **Reconnection**: If the connector is found and the TTL hasn’t expired:
- For burner wallets, the correct account is restored based on the index.
- Initiates the connection using the `connect` function from `useConnect`.

---

### **Configuration**
Ensure the following keys are defined in your `scaffold.config`:
- `walletAutoConnect`: A boolean flag to enable or disable auto-connect by setting it to `true` or `false`.
- `autoConnectTTL`: Time-to-live (in milliseconds) for auto-connect.

---

### **Best Practices**
- Use this hook at the application root to manage wallet connections seamlessly.

---
