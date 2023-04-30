import type { Position } from '@/types/data.type';
import { useMap } from 'react-kakao-maps-sdk';

const useBounds = () => {
  const Map = useMap();
  return (sw: Position, ne: Position) =>
    Map.setBounds(new kakao.maps.LatLngBounds(new kakao.maps.LatLng(sw.lat, sw.lng), new kakao.maps.LatLng(ne.lat, ne.lng)));
};

export default useBounds;
