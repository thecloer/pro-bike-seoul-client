import type { PathPointInfo } from '@/types/path.type';
import { useReducer, createContext, PropsWithChildren, useContext } from 'react';

type PathContextState = {
  start: PathPointInfo | null;
  ent: PathPointInfo | null;
};

const defaultPath: PathContextState = {
  start: null,
  ent: null,
};

type PathContextAction =
  | { type: 'SWAP_POINTS' }
  | { type: 'SET_START'; point: PathPointInfo }
  | { type: 'SET_END'; point: PathPointInfo };

function reducer(state: PathContextState, action: PathContextAction): PathContextState {
  const { start, ent } = state;
  switch (action.type) {
    case 'SWAP_POINTS': {
      return { start: ent, ent: start };
    }
    case 'SET_START': {
      return { ...state, start: action.point };
    }
    case 'SET_END': {
      return { ...state, ent: action.point };
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
