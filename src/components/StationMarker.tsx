import type { ServerStationInfo } from '@/types/data.type';
import React, { useState } from 'react';
import { ReactComponent as LocationIcon } from '@/lib/svg/location.svg';
import MarkerInfoWindow from '@/components/MarkerInfoWindow';
import CustomDiv from '@/components/CustomDiv';
import { useRoute } from '@/contexts/TripContext';
import usePanTo from '@/hooks/usePanTo';

type Props = {
  station: ServerStationInfo;
};

export default React.memo(function StationMarker({
  station: { stationId, stationName, lat, lng, address, addressName, rackCount, availableBikeCount },
}: Props) {
  const { setStartPoint, setEndPoint } = useRoute();
  const panTo = usePanTo();
  const [isOpen, setIsOpen] = useState(false);
  const text = stationName ? stationName : addressName;

  const onMarkerClick = () => panTo({ lat, lng });
  const onStartClick = () => setStartPoint({ lat, lng, text, address });
  const onEndClick = () => setEndPoint({ lat, lng, text, address });

  return (
    <CustomDiv
      center={{ lat, lng }}
      className='hover:cursor-pointer h-10 w-10 p-1'
      onClick={onMarkerClick}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onTouchStart={(e) => e.stopPropagation()}
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
            {availableBikeCount < 1 ? null : (
              <button
                className='border border-primary-600 px-1 rounded bg-primary-600 text-slate-100'
                onClick={onStartClick}
                onTouchEnd={(e) => onStartClick()}
              >
                출발
              </button>
            )}
            <button className='border border-primary-600 px-1 rounded' onClick={onEndClick} onTouchEnd={(e) => onEndClick()}>
              도착
            </button>
          </div>
        </MarkerInfoWindow>
      )}
    </CustomDiv>
  );
});
