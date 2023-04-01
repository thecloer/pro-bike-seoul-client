import { Map } from 'react-kakao-maps-sdk';
import { UOS_POSITION } from '@/configs/defaultValues';
import useWatchPosition from '@/hooks/useWatchPosition';
import CurrentLocationMarker from '@/components/CurrentLocationMarker';
import PanToCurrentLocationButton from '@/components/PanToCurrentLocationButton';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import SelectedPointMarker from '@/components/SelectedPointMarker';
import PathPanel from '@/components/pathPanel/PathPanel';

export default function MainMap() {
  const currentPosition = useWatchPosition();
  const { setSelectedPoint } = useSelectedPoint();

  const onMapClick = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    (document.activeElement as HTMLElement).blur(); // blur input
    setSelectedPoint({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

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

      <SelectedPointMarker />
      <PathPanel />
    </Map>
  );
}
