import type { Position } from '@/types/geo.type';
import CustomDiv from '@/components/CustomDiv';

type Props = {
  center: Position;
};
export default function CurrentLocationMarker({ center }: Props) {
  return (
    <CustomDiv center={center} className='relative w-3 h-3'>
      <div className='absolute top-0 left-0 w-full h-full rounded-full bg-sky-500/80' />
      <div className='absolute top-0 left-0 w-full h-full rounded-full animate-ping bg-sky-500'></div>
    </CustomDiv>
  );
}
