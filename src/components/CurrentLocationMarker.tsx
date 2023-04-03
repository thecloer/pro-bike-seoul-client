import type { Position } from '@/types/geo.type';
import CustomDiv from '@/components/CustomDiv';

type Props = {
  center: Position;
};
export default function CurrentLocationMarker({ center }: Props) {
  return (
    <CustomDiv center={center} className='relative w-3 h-3'>
      <div className='absolute top-1/2 left-1/2 w-full h-full rounded-full bg-sky-500/80' />
      <div className='absolute top-1/2 left-1/2 w-full h-full rounded-full animate-ping bg-sky-500'></div>
    </CustomDiv>
  );
}
