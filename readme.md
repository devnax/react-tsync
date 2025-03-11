Here's the updated documentation with the correct package name:

# `react-tsync` - React Hook and HOC for Handling Asynchronous Operations

## Overview

`react-tsync` provides two utility functions for handling asynchronous operations in React: `useAsync` and `withAsync`. These hooks simplify the management of asynchronous data fetching, error handling, and reloading logic within React components.

### Features

- **`useAsync`**: A hook that handles asynchronous operations, loading states, and error handling within a component.
- **`withAsync`**: A higher-order component (HOC) that wraps a component to handle asynchronous operations with built-in loading and error fallback UI.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-tsync
# or
yarn add react-tsync
```

## API Documentation

### `useAsync`

```ts
const { data, isLoading, error, reload } = useAsync<T>(promise: Promise<T>, dependencies: any[] = []): UseAsyncResult<T>
```

#### Parameters

- **`promise`** (`Promise<T>`): A promise that represents an asynchronous operation. The hook will execute this promise and manage the loading and error states.
- **`dependencies`** (`any[]`, optional): An array of dependencies for the `useEffect` hook. It determines when the async operation should be re-triggered.

#### Returns

The `useAsync` hook returns an object with the following properties:

- **`data`** (`T | null`): The result of the asynchronous operation. If the operation hasn't completed yet, this will be `null`.
- **`isLoading`** (`boolean`): A flag indicating whether the asynchronous operation is in progress.
- **`error`** (`Error | null`): An error object if an error occurred during the operation. If no error occurred, this will be `null`.
- **`reload`** (`() => void`): A function to trigger a reload of the asynchronous operation. It toggles the reloading state, re-running the promise.

#### Example Usage

```tsx
const MyComponent = () => {
  const { data, isLoading, error, reload } = useAsync(fetch(`https://jsonplaceholder.typicode.com/posts/${id}`), []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>{data}</div>
      <button onClick={reload}>Reload</button>
    </div>
  );
};
```

### `withAsync`

```ts
const withAsync = (Component: ComponentPromise, fallback?: React.ReactNode, onError?: onError) => {
  return function WrappedComponent<P>(props: P): React.ReactNode
}
```

#### Parameters

- **`Component`** (`ComponentPromise`): A function that returns a React component. This component will be wrapped by the HOC.
- **`fallback`** (`React.ReactNode`, optional): A React node to be shown while the data is loading.
- **`onError`** (`onError`, optional): A function that takes an error message and returns a React node. This will be displayed if an error occurs during the asynchronous operation.

#### Returns

- A React component that wraps the provided `Component` and handles asynchronous operations. This component will display the fallback UI while loading and handle errors using the provided `onError` function.

#### Example Usage

```tsx
const MyComponent = (props: { id: string }) => {
  return <div>Data for {props.id}</div>;
};

const WrappedComponent = withAsync(MyComponent, <div>Loading...</div>, (error: string) => <div>Error: {error}</div>);

const App = () => {
  return <WrappedComponent id="123" />;
};
```

## Example Usage

### Example 1: Using `useAsync` in a Component

```tsx
const FetchDataComponent = () => {
  const { data, isLoading, error, reload } = useAsync(fetch(`https://jsonplaceholder.typicode.com/posts/${id}`), []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>{data.bod}</div>
      <button onClick={reload}>Reload</button>
    </div>
  );
};
```

### Example 2: Using `withAsync` to Wrap a Component

```tsx
const MyComponent = async ({ id }: { id: string }) => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return <div>Data for {data.body}</div>;
};

const WrappedComponent = withAsync(MyComponent, <div>Loading...</div>, (error: string) => <div>Error: {error}</div>);

const App = () => {
  return <WrappedComponent id="123" />;
};
```

## License

This package is open-source and available under the MIT License.

---

You can now publish this documentation along with your package `react-tsync` on npm!