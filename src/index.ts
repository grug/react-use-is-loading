import { useSelector } from 'react-redux';

function useIsLoading<State>(
  fetchingFlag: keyof State[keyof State],
  keys?: Array<keyof State>,
) {
  return useSelector((state: State) => {
    const k = keys as Array<keyof State>;

    return Object.keys(state)
      .filter(key => (k ? k?.includes(key as keyof State) : true))
      .some(key => state[key as keyof State][fetchingFlag]);
  });
}

export { useIsLoading };
