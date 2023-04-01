import type { PositionInfo } from '@/types/geo.type';
import { createContext, Dispatch, useContext, SetStateAction, PropsWithChildren, useState } from 'react';

type SelectedPoint = PositionInfo | null;
type SelectedPointContext = {
  selectedPoint: SelectedPoint;
  setSelectedPoint: Dispatch<SetStateAction<SelectedPoint>>;
};

const SelectedPointContext = createContext<SelectedPointContext>({
  selectedPoint: null,
  setSelectedPoint: () => {},
});

export const useSelectedPoint = () => useContext(SelectedPointContext);

export function SelectedPointProvider({ children }: PropsWithChildren) {
  const [selectedPoint, setSelectedPoint] = useState<SelectedPoint>(null);
  return (
    <SelectedPointContext.Provider
      value={{
        selectedPoint,
        setSelectedPoint,
      }}
    >
      {children}
    </SelectedPointContext.Provider>
  );
}
