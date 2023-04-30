import type { Position } from '@/types/data.type';
import type { PropsWithChildren } from 'react';
import { useMap } from 'react-kakao-maps-sdk';
import usePanTo from '@/hooks/usePanTo';

type Props = {
  className: string;
  to: Position;
};

export default function PanToButton({ to, className, children }: PropsWithChildren<Props>) {
  const Map = useMap();
  const panTo = usePanTo();

  const onClick = () => {
    panTo(to);
    Map.setLevel(4);
  };

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
