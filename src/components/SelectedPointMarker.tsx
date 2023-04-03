import { useEffect } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import usePanTo from '@/hooks/usePanTo';

export default function SelectedPointMarker() {
  const { selectedPoint, setSelectedPoint } = useSelectedPoint();
  const panTo = usePanTo();

  useEffect(() => {
    if (selectedPoint !== null) panTo(selectedPoint);
  }, [selectedPoint, Map]);

  if (selectedPoint === null) return null;

  const onMarkerClick = () => setSelectedPoint(null); // TODO: path.start / path.end

  return <MapMarker position={selectedPoint} onClick={onMarkerClick} />;
}
