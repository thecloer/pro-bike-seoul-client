import { Map } from 'react-kakao-maps-sdk';
import { UOS_POSITION } from '@/config/defaultValues';
import useWatchPosition from '@/hooks/useWatchPosition';
import CurrentLocationMarker from '@/components/CurrentLocationMarker';
import PanToCurrentLocationButton from '@/components/PanToCurrentLocationButton';

export default function MainMap() {
  const currentPosition = useWatchPosition();
  return (
    <Map center={currentPosition.loaded ? currentPosition.coords : UOS_POSITION} className='w-full h-full z-0'>
      {currentPosition.loaded && (
        <>
          <CurrentLocationMarker center={currentPosition.coords} />
          <PanToCurrentLocationButton to={currentPosition.coords} />
        </>
      )}
    </Map>
  );
}
