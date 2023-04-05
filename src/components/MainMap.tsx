import { Map } from 'react-kakao-maps-sdk';
import { useEffect } from 'react';
import { UOS_POSITION } from '@/configs/defaultValues';
import useWatchPosition from '@/hooks/useWatchPosition';
import PanToCurrentLocationButton from '@/components/PanToCurrentLocationButton';
import CurrentLocationMarker from '@/components/CurrentLocationMarker';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import SelectedPointMarker from '@/components/SelectedPointMarker';
import StationMarker from '@/components/StationMarker';
import PathPanel from '@/components/pathPanel/PathPanel';
import useStationsNearbyStatus from '@/hooks/queries/useStationsNearbyStatus';

export default function MainMap() {
  const currentPosition = useWatchPosition();
  const { selectedPoint, setSelectedPoint } = useSelectedPoint();

  const { stations, isSuccess: isStationSuccess, refetchStatus } = useStationsNearbyStatus(selectedPoint);

  const onMapClick = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    (document.activeElement as HTMLElement).blur(); // blur input
    setSelectedPoint({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  useEffect(() => {
    if (isStationSuccess) refetchStatus();
  }, [isStationSuccess, selectedPoint]);

  return (
    <Map
      className='w-full h-full z-0'
      center={currentPosition.loaded ? currentPosition.coords : UOS_POSITION}
      onClick={onMapClick}
    >
      {currentPosition.loaded && (
        <>
          <CurrentLocationMarker center={currentPosition.coords} />
          <PanToCurrentLocationButton to={currentPosition.coords} />
        </>
      )}

      {stations.map((stationInfo) => (
        <StationMarker key={stationInfo.id} station={stationInfo} />
      ))}

      <SelectedPointMarker />
      <PathPanel />
    </Map>
  );
}
