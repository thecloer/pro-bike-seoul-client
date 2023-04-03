import type { StationInfo } from '@/types/entity.type';
import React from 'react';
import CustomDiv from '@/components/CustomDiv';
import { ReactComponent as LocationIcon } from '@/lib/svg/location.svg';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import usePanTo from '@/hooks/usePanTo';

type Props = {
  station: StationInfo;
};

export default React.memo(function StationMarker({
  station: { id: stationId, name: stationName, lat, lng, address, rackCount, availableBikeCount },
}: Props) {
  const { setSelectedPoint } = useSelectedPoint();
  const panTo = usePanTo();
  const onMarkerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setSelectedPoint(null);
    panTo({ lat, lng });
  };

  // TODO: info window
  return (
    <CustomDiv
      center={{ lat, lng }}
      className='hover:cursor-pointer h-10 w-10 p-1'
      onClick={onMarkerClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <LocationIcon className='absolute bottom-1/2 left-0 w-full h-full text-primary-600' />
    </CustomDiv>
  );
});
