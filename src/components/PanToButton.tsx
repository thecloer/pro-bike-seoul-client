import type { Position } from '@/types/data.type';
import type { PropsWithChildren } from 'react';
import usePanTo from '@/hooks/usePanTo';

type Props = {
  className: string;
  to: Position;
};

export default function PanToButton({ to, className, children }: PropsWithChildren<Props>) {
  const panTo = usePanTo();

  const onClick = () => panTo(to);

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
