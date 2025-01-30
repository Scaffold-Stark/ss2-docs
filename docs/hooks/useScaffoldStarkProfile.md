---
sidebar_position: 10
---

# useScaffoldStarkProfile

Use this hook to fetch and manage the StarkNet profile of a specified address. The StarkNet profile includes the user's domain name and profile picture, leveraging the StarkNet ID API for supported networks.

```ts
const { data, isLoading } = useScaffoldStarkProfile(
  "0x061b6c0a78f9edf13cea17b50719f3344533fadd470b8cb29c2b4318014f52d3",
);
```

## Usage Example

This example fetches the StarkNet profile for the provided address in the function. The returned object contains the profile `data` which includes the user's name and profile picture, along with `isLoading` showing the loading state.

```tsx
import { useScaffoldStarkProfile } from "~~/hooks/scaffold-stark/useScaffoldStarkProfile";

const ProfileDisplay = ({ userAddress }) => {
  const { data, isLoading } = useScaffoldStarkProfile(userAddress);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!data?.name) {
    return <p>No profile found for the provided address.</p>;
  }

  return (
    <div>
      <img src={data.profilePicture} alt={`${data.name}'s profile`} width="100" />
      <p>Name: {data.name}</p>
    </div>
  );
};
```

This example demonstrates how to use the `useScaffoldStarkProfile` hook to display a user's StarkNet profile with their name and profile picture.

---

## Configuration

| Parameter   | Description                                    |
| :---------- | :--------------------------------------------- |
| **address** | The StarkNet address to fetch the profile for. |

---

## Return Values

| Parameter     | Type           | Description                                                         |
| :------------ | :------------- | :------------------------------------------------------------------ |
| **data**      | `StarkProfile` | The user's StarkNet profile, including `name` and `profilePicture`. |
| **isLoading** | `boolean`      | Indicates whether the profile data is being fetched.                |

---

## StarkProfile Object

| Field              | Type     | Description                                             |
| :----------------- | :------- | :------------------------------------------------------ |
| **name**           | `string` | The domain name associated with the user's StarkNet ID. |
| **profilePicture** | `string` | URL of the user's profile picture.                      |

---

## Best Practices

- Use this hook in components where you need to display user-specific StarkNet information, such as their domain name or profile picture.
- Ensure that the target network supports StarkNet profiles.
- Handle loading and fallback states to provide a better user experience.

---

## Error Handling

This hook does not explicitly handle errors but logs them to the console. To manage errors in your component:

```tsx
const { data, isLoading } = useScaffoldStarkProfile(userAddress);

if (isLoading) {
  return <div>Loading profile...</div>;
}

if (!data?.name) {
  return <div>No profile found or an error occurred.</div>;
}
```
