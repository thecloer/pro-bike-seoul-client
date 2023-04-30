import type { RouteEndPoint, Route } from '@/types/data.type';
import { useReducer, createContext, PropsWithChildren, useContext } from 'react';

type TripContextState = {
  start: RouteEndPoint;
  end: RouteEndPoint;
  route: Route | null;
};

const defaultTrip: TripContextState = {
  start: { text: '' },
  end: { text: '' },
  route: null,
};

type RouteContextAction =
  | { type: 'SWAP_POINTS' }
  | { type: 'SET_START'; point: RouteEndPoint }
  | { type: 'SET_END'; point: RouteEndPoint }
  | { type: 'SET_ROUTE'; route: Route }
  | { type: 'DELETE_ROUTE' };

function reducer(state: TripContextState, action: RouteContextAction): TripContextState {
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
    case 'SET_ROUTE': {
      return { ...state, route: action.route };
    }
    case 'DELETE_ROUTE': {
      return { ...state, route: null };
    }
  }
}

type RouteContext = {
  trip: TripContextState;
  swapDestination: () => void;
  setStartPoint: (point: RouteEndPoint) => void;
  setEndPoint: (point: RouteEndPoint) => void;
  setRoute: (route: Route | null) => void;
};

const RouteContext = createContext<RouteContext>({
  trip: defaultTrip,
  swapDestination: () => {},
  setStartPoint: () => {},
  setEndPoint: () => {},
  setRoute: () => {},
});

export const useRoute = () => useContext(RouteContext);

export function RouteProvider({ children }: PropsWithChildren) {
  const [trip, dispatch] = useReducer(reducer, defaultTrip);

  const swapDestination = () => dispatch({ type: 'SWAP_POINTS' });
  const setStartPoint = (point: RouteEndPoint) => dispatch({ type: 'SET_START', point });
  const setEndPoint = (point: RouteEndPoint) => dispatch({ type: 'SET_END', point });
  const setRoute = (route: Route | null) => {
    if (route === null) dispatch({ type: 'DELETE_ROUTE' });
    else dispatch({ type: 'SET_ROUTE', route });
  };

  return (
    <RouteContext.Provider
      value={{
        trip,
        swapDestination,
        setStartPoint,
        setEndPoint,
        setRoute,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}
