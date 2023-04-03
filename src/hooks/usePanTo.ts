import type { Position } from '@/types/geo.type';
import { useMap } from 'react-kakao-maps-sdk';

const usePanTo = () => {
  const Map = useMap();
  return (to: Position) => Map.panTo(new kakao.maps.LatLng(to.lat, to.lng));
};

export default usePanTo;
