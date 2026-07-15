# React

Shared across workspaces. A workspace's own CLAUDE.md may override anything here — the override wins.

## Components

A component is a `const`, an arrow function typed with `React.FC`, `export default`ed:

```tsx
import cx from "classnames"

export type FooBarProps = {
  value: string
  className?: string
  style?: React.CSSProperties
}

const FooBar: React.FC<FooBarProps> = ({
  value,
  className,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cx("foobar", className)}
      style={{ ...style, fontWeight: "bold" }}
    >
      {value}
    </div>
  )
}

export default FooBar
```

- A shared component **exports its props type independently**, named `<Component>Props`.
- **Proxy the rest.** Spread unhandled props onto the root element (`...props`); and when the component sets `className` or `style` itself, merge a caller's `className` (via `classnames`) and spread a caller's `style`, so an override always lands.
- **Order props by meaning, not alphabet.** In the type, the destructure, and the JSX, order props by semantic importance and keep related ones together. Never alphabetize them.

## Modlet layout

A React component modlet (see `modlets.md`) is a thin index over a named main file:

- **`index.ts`** — the barrel: `export { default } from "./<Component>"`, plus `export *` of what it names.
- **`<Component>.tsx`** — the component and its `<Component>Props`.
- **`<Component>.module.css`** — its styles, if any.
- **`<Component>.types.ts`** — types beyond the props (variants, option shapes), when there are enough to earn a file.
- **Anything else** — private sub-components and helpers, each named for itself (`Node.tsx`, `Node.module.css`).
