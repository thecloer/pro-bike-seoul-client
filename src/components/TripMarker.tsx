import type { Position } from '@/types/data.type';
import { ReactComponent as LocationIcon } from '@/lib/svg/location.svg';
import CustomDiv from '@/components/CustomDiv';
import React from 'react';

type Props = {
  position: Position;
  type: 'origin' | 'destination' | 'waypoint';
};

export default React.memo(function TripMarker({ position, type }: Props) {
  return (
    <CustomDiv center={position} className='h-10 w-10 p-1'>
      <LocationIcon
        className={`absolute bottom-1/2 left-0 w-full h-full ${
          type === 'origin' ? 'text-blue-600 z-10' : type === 'destination' ? 'text-blue-600 z-10' : 'text-primary-600'
        }`}
      />
      <div
        className={`absolute -top-full left-1/2 -translate-x-1/2 translate-y-6 text-white font-semibold select-none min-w-[10px] min-h-[20px] ${
          type === 'origin' ? 'bg-blue-600 z-10' : type === 'destination' ? 'bg-blue-600 z-10' : 'bg-primary-600'
        }`}
      >
        {type === 'origin' ? '출' : type === 'destination' ? '도' : ''}
      </div>
    </CustomDiv>
  );
});
