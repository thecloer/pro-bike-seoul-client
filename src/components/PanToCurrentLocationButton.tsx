import type { Position } from '@/types/geo.type';
import PanToButton from '@/components/PanToButton';
import { ReactComponent as LocationIcon } from '@/lib/svg/location.svg';

type Props = {
  to: Position;
};

export default function PanToCurrentLocationButton({ to }: Props) {
  return (
    <PanToButton
      to={to}
      className='group absolute right-4 bottom-4 z-10 h-9 w-9 bg-white p-2 rounded-md shadow hover:shadow-xl transition-colors duration-300'
    >
      <span className='sr-only'>현재 위치로 이동</span>
      <LocationIcon className='text-primary-600 group-hover:text-primary-700' />
    </PanToButton>
  );
}
