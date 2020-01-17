# react-use-is-loading

React hook for determining if any specified part of your application state is loading.

## This hook is for you if you...

- Want an easy way of knowing within a component if a given part of state is loading ✅

## Installation

With NPM:

```bash
npm i --save react-use-is-loading
```

With Yarn:

```bash
yarn add react-use-is-loading
```

## API

`useIsLoading` is a function that takes 2 parameters:

- `fetchingFlag`: this is the flag that you use in your Redux store in order to flag whether a slice of state is loading.
- `keys`: these are the keys (from your Redux store) that you want to check to see if they are loading.

## How it works

- You call the hook with the parameters described above.
- You receive a boolean back that indicates whether any of the specified parts of state are loading.

**Note:** your Redux store **must** contain the fetching flag you specify for each slice of state AND it must be at the root of each slice (see usage section for more detail)

## Usage

If your Redux store looks like this:

```typescript
type State = {
  a: {
    foo: string;
    isFetching: boolean;
  };
  b: {
    bar: string;
    isFetching: boolean;
  };
  c: {
    baz: boolean;
    isFetching: boolean;
  };
};
```

And we assume that:

1. All root level slices of state (i.e. `a`, `b` and `c`) have an `isFetching` flag.
2. `isFetching` is set to true whilst data is fetching (i.e. an action has been dispatched to begin the data retrieval process).

We can then determine whether something is loading in a component like this:

**In SomeComponent.tsx**

```tsx
import React from 'react';
import { useIsLoading } from 'react-use-is-loading';

const MyComponent = () => {
  const isLoading = useIsLoading('isFetching', ['a', 'b']);

  return isLoading ? <span>Loading...</span> : <div>Here is some content</div>;
};

export { MyComponent };
```

It's as simple as that. We have specified that the flag we use in our Redux store for tracking whether a slice of state has loaded (`isFetching`) and the keys of state that we want to track whether they have loaded (`a` and `b`). We render some loading content if they haven't loaded yet, else we load some other content.

## Testing

The project uses Jest for testing, along with [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library) for rendering hooks without explicitly creating harness components.

## Contributing

I welcome all contributions to this project. Please feel free to raise any issues or pull requests as you see fit :)
