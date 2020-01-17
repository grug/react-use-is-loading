import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from 'react-redux';
import { useIsLoading } from './';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockUseSelector = useSelector as jest.Mock;

type DataFetching = {
  isFetching: boolean;
};

type State = {
  a: {
    foo?: string;
  } & DataFetching;
  b: {
    bar?: number;
  } & DataFetching;
  c: {
    baz?: boolean;
  } & DataFetching;
};

describe(`useLoading hook`, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  [
    {
      scenario: 'returns true when some requested state keys are loading',
      state: {
        a: { isFetching: false },
        b: { isFetching: false },
        c: { isFetching: true },
      },
      loadingKeys: ['a', 'b', 'c'],
      expectedResult: true,
    },
    {
      scenario:
        'returns false when none of the requested state keys are loading (state is all isFetching = false)',
      state: {
        a: { isFetching: false },
        b: { isFetching: false },
        c: { isFetching: false },
      },
      loadingKeys: ['a', 'b', 'c'],
      expectedResult: false,
    },
    {
      scenario:
        'returns false when none of the requested state keys are loading (state is some isFetching = false)',
      state: {
        a: { isFetching: false },
        b: { isFetching: false },
        c: { isFetching: true },
      },
      loadingKeys: ['a', 'b'],
      expectedResult: false,
    },
    {
      scenario: 'returns false when no state keys are requested',
      state: {
        a: { isFetching: true },
        b: { isFetching: true },
        c: { isFetching: true },
      },
      loadingKeys: [],
      expectedResult: false,
    },
    {
      scenario: 'returns false when invalid state key is requested',
      state: {
        a: { isFetching: true },
        b: { isFetching: true },
        c: { isFetching: true },
      },
      loadingKeys: ['invalidKey'],
      expectedResult: false,
    },
  ].forEach(({ scenario, state, loadingKeys, expectedResult }) => {
    it(scenario, () => {
      mockUseSelector.mockImplementation(callback => callback(state));

      const { result } = renderHook(() =>
        useIsLoading<State>('isFetching', loadingKeys),
      );
      expect(result.current).toBe(expectedResult);
    });
  });

  it('still works when no second parameter is passed', () => {
    const state = {
      a: { isFetching: true },
      b: { isFetching: true },
      c: { isFetching: true },
    };
    mockUseSelector.mockImplementation(callback => callback(state));

    const { result } = renderHook(() => useIsLoading<State>('isFetching'));

    expect(result.current).toBe(true);
  });
});
