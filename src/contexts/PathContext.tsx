import type { PathPointInfo, Position } from '@/types/data.type';
import { useReducer, createContext, PropsWithChildren, useContext } from 'react';

type PathContextState = {
  start: PathPointInfo;
  end: PathPointInfo;
  points: Position[] | null;
  waypoints: Position[] | null;
};

const defaultPath: PathContextState = {
  start: { text: '' },
  end: { text: '' },
  points: null,
  waypoints: null,
};

type PathContextAction =
  | { type: 'SWAP_POINTS' }
  | { type: 'SET_START'; point: PathPointInfo }
  | { type: 'SET_END'; point: PathPointInfo }
  | { type: 'SET_PATH'; points: Position[]; waypoints: Position[] }
  | { type: 'DELETE_PATH' };

function reducer(state: PathContextState, action: PathContextAction): PathContextState {
  switch (action.type) {
    case 'SWAP_POINTS': {
      return { ...state, start: state.end, end: state.start };
    }
    case 'SET_START': {
      return { ...state, start: action.point };
    }
    case 'SET_END': {
      return { ...state, end: action.point };
    }
    case 'SET_PATH': {
      return { ...state, points: action.points, waypoints: action.waypoints };
    }
    case 'DELETE_PATH': {
      return { ...state, points: null, waypoints: null };
    }
  }
}

type PathContext = {
  path: PathContextState;
  swapDestination: () => void;
  setStartPoint: (point: PathPointInfo) => void;
  setEndPoint: (point: PathPointInfo) => void;
  setPath: (path: { points: Position[]; waypoints: Position[] } | null) => void;
};

const PathContext = createContext<PathContext>({
  path: defaultPath,
  swapDestination: () => {},
  setStartPoint: () => {},
  setEndPoint: () => {},
  setPath: () => {},
});

export const usePath = () => useContext(PathContext);

export function PathProvider({ children }: PropsWithChildren) {
  const [path, dispatch] = useReducer(reducer, defaultPath);

  const swapDestination = () => dispatch({ type: 'SWAP_POINTS' });
  const setStartPoint = (point: PathPointInfo) => dispatch({ type: 'SET_START', point });
  const setEndPoint = (point: PathPointInfo) => dispatch({ type: 'SET_END', point });
  const setPath = (path: { points: Position[]; waypoints: Position[] } | null) => {
    if (path === null) dispatch({ type: 'DELETE_PATH' });
    else dispatch({ type: 'SET_PATH', ...path });
  };

  return (
    <PathContext.Provider
      value={{
        path,
        swapDestination,
        setStartPoint,
        setEndPoint,
        setPath,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}
