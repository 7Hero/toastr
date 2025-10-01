# @vasilepopescu/toastr

A tiny React toast system built for modern React apps.

## Installation

```bash
npm install @vasilepopescu/toastr
```

## Quick Start

```tsx
import { Toaster, toast } from "@vasilepopescu/toastr";

export function App() {
  return (
    <>
      <Toaster position="bottom-right" expand={false} />
      <button onClick={() => toast({ message: "Saved!" })}>Save</button>
    </>
  );
}
```

Place `<Toaster />` once near the root of your app so it can render toast messages anywhere.

## Triggering toasts

Call `toast` with a message to show a notification:

```ts
toast({ message: "Profile updated" });
```

The `type` field is accepted but currently ignored:

```ts
toast({ type: "success", message: "Profile updated" });
```

## Component props

- `position` (`"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`, default `"bottom-right"`): where the stack is anchored.
- `expand` (`boolean`, default `false`): when `true`, the list stays expanded instead of collapsed. Hovering the stack also temporarily expands it.

## Roadmap

- [ ] toastsVisible prop
- [ ] Pause timer on hover
- [ ] Types
- [ ] Promises? (maybe)
- [ ] Drag events?
- [ ] Update same toast?
- [ ] Clean code
