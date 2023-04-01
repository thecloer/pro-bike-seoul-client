import type { Position } from '@/types/geo.type';
import { PropsWithChildren } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

type Props = {
  className: string;
  to: Position;
};

export default function PanToButton({ to, className, children }: PropsWithChildren<Props>) {
  const Map = useMap();
  const moveMap = () => Map.panTo(new kakao.maps.LatLng(to.lat, to.lng));

  return (
    <button className={className} onClick={moveMap}>
      {children}
    </button>
  );
}
