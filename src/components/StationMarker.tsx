import type { StationInfo } from '@/types/entity.type';
import React, { useState } from 'react';
import MarkerInfoWindow from '@/components/MarkerInfoWindow';
import CustomDiv from '@/components/CustomDiv';
import { ReactComponent as LocationIcon } from '@/lib/svg/location.svg';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import usePanTo from '@/hooks/usePanTo';
import { usePath } from '@/contexts/PathContext';

type Props = {
  station: StationInfo;
};

export default React.memo(function StationMarker({
  station: { id: stationId, name: stationName, lat, lng, address, addressName, rackCount, availableBikeCount },
}: Props) {
  const { setSelectedPoint } = useSelectedPoint();
  const { setStartPoint, setEndPoint } = usePath();
  const panTo = usePanTo();
  const [isOpen, setIsOpen] = useState(false);

  const onMarkerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setSelectedPoint(null);
    panTo({ lat, lng });
  };

  const onStartClick = () => setStartPoint({ lat, lng, text: stationName, address });
  const onEndClick = () => setEndPoint({ lat, lng, text: stationName, address });

  // TODO: info window
  return (
    <CustomDiv
      center={{ lat, lng }}
      className='hover:cursor-pointer h-10 w-10 p-1'
      onClick={onMarkerClick}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <LocationIcon className='absolute bottom-1/2 left-0 w-full h-full text-primary-600' />

      <span className='absolute -top-full left-1/2 -translate-x-1/2 translate-y-6 bg-primary-600 text-white font-semibold select-none min-w-[10px]'>
        {availableBikeCount}
      </span>

      {isOpen && (
        <MarkerInfoWindow>
          <div className='mb-3'>
            <div className='flex justify-between mb-3 items-baseline gap-3'>
              <span className='font-medium'>{stationName}</span>
              <span className='text-xs'>{`${availableBikeCount}/${rackCount}`}</span>
            </div>
            <div className=''>{addressName}</div>
            <div className='text-xs text-slate-600'>{address}</div>
          </div>
          <div className='flex justify-end gap-1'>
            <button className='border border-primary-600 px-1 rounded bg-primary-600 text-slate-100' onClick={onStartClick}>
              출발
            </button>
            <button className='border border-primary-600 px-1 rounded' onClick={onEndClick}>
              도착
            </button>
          </div>
        </MarkerInfoWindow>
      )}
    </CustomDiv>
  );
});
