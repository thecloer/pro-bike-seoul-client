import type { Position } from '@/types/data.type';
import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AbstractOverlay } from 'react-kakao-maps-sdk';

type Props = {
  center: Position;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CustomDiv({ center, children, ...props }: PropsWithChildren<Props>) {
  const node = useRef(document.createElement('div'));

  const positionLatLng = useMemo(() => new kakao.maps.LatLng(center.lat, center.lng), [center.lat, center.lng]);

  function onAdd(this: kakao.maps.AbstractOverlay) {
    const panel = this.getPanels().overlayLayer;
    panel.appendChild(node.current);
  }

  function onRemove() {
    node.current.parentNode?.removeChild(node.current);
  }

  function draw(this: kakao.maps.AbstractOverlay) {
    const projection = this.getProjection();
    const point = projection.pointFromCoords(positionLatLng);
    const width = node.current.offsetWidth;
    const height = node.current.offsetHeight;

    node.current.style.left = point.x - width / 2 + 'px';
    node.current.style.top = point.y - height / 2 + 'px';
  }

  useEffect(() => {
    node.current.style.position = 'absolute';
    node.current.style.whiteSpace = 'nowrap';
  }, []);

  return (
    <>
      <AbstractOverlay onAdd={onAdd} onRemove={onRemove} draw={draw} />
      {createPortal(<div {...props}>{children}</div>, node.current)}
    </>
  );
}
