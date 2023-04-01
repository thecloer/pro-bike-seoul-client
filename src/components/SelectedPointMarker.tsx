import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import { useEffect } from 'react';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

export default function SelectedPointMarker() {
  const Map = useMap();
  const { selectedPoint, setSelectedPoint } = useSelectedPoint();

  useEffect(() => {
    if (selectedPoint !== null) Map.panTo(new kakao.maps.LatLng(selectedPoint.lat, selectedPoint.lng));
  }, [selectedPoint, Map]);

  if (selectedPoint === null) return null;

  const onMarkerClick = () => setSelectedPoint(null); // TODO: path.start / path.end

  return <MapMarker position={selectedPoint} onClick={onMarkerClick} />;
}
