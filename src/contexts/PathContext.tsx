import type { PathPointInfo } from '@/types/data.type';
import { useReducer, createContext, PropsWithChildren, useContext } from 'react';

type PathContextState = {
  start: PathPointInfo;
  end: PathPointInfo;
};

const defaultPath: PathContextState = {
  start: { text: '' },
  end: { text: '' },
};

type PathContextAction =
  | { type: 'SWAP_POINTS' }
  | { type: 'SET_START'; point: PathPointInfo }
  | { type: 'SET_END'; point: PathPointInfo };

function reducer(state: PathContextState, action: PathContextAction): PathContextState {
  const { start, end } = state;
  switch (action.type) {
    case 'SWAP_POINTS': {
      return { start: end, end: start };
    }
    case 'SET_START': {
      return { ...state, start: action.point };
    }
    case 'SET_END': {
      return { ...state, end: action.point };
    }
  }
}

type PathContext = {
  path: PathContextState;
  swapDestination: () => void;
  setStartPoint: (point: PathPointInfo) => void;
  setEndPoint: (point: PathPointInfo) => void;
};

const PathContext = createContext<PathContext>({
  path: defaultPath,
  swapDestination: () => {},
  setStartPoint: () => {},
  setEndPoint: () => {},
});

export const usePath = () => useContext(PathContext);

export function PathProvider({ children }: PropsWithChildren) {
  const [path, dispatch] = useReducer(reducer, defaultPath);

  const swapDestination = () => dispatch({ type: 'SWAP_POINTS' });
  const setStartPoint = (point: PathPointInfo) => dispatch({ type: 'SET_START', point });
  const setEndPoint = (point: PathPointInfo) => dispatch({ type: 'SET_END', point });

  return (
    <PathContext.Provider
      value={{
        path,
        swapDestination,
        setStartPoint,
        setEndPoint,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
