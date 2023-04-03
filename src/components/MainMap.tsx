import type { StationInfo } from '@/types/entity.type';
import { Map } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { UOS_POSITION } from '@/configs/defaultValues';
import useWatchPosition from '@/hooks/useWatchPosition';
import PanToCurrentLocationButton from '@/components/PanToCurrentLocationButton';
import CurrentLocationMarker from '@/components/CurrentLocationMarker';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import SelectedPointMarker from '@/components/SelectedPointMarker';
import StationMarker from '@/components/StationMarker';
import PathPanel from '@/components/pathPanel/PathPanel';
import fetchStationsNearby from '@/fetches/server/fetchStationsNearby';
import fetchStationStatus from '@/fetches/thirdParty/fetchStationStatus';

export default function MainMap() {
  const currentPosition = useWatchPosition();
  const { selectedPoint, setSelectedPoint } = useSelectedPoint();
  const [stations, setStations] = useState<StationInfo[]>([]);

  const onMapClick = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    (document.activeElement as HTMLElement).blur(); // blur input
    setSelectedPoint({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  // TODO: fetch stations near by selected point
  useEffect(() => {
    if (selectedPoint === null) return;
    const getStationsNearBySelectedPoint = async () => {
      const stationNearbyResult = await fetchStationsNearby(selectedPoint);
      if (!stationNearbyResult.success) return console.log(stationNearbyResult); // TODO: error handling

      const nearStations = stationNearbyResult.data;

      // FIXME: dummy data -> seoul bike api data
      const dummyStations: StationInfo[] = nearStations.map(({ lat, lng, stationId, address, stationName }) => ({
        id: stationId,
        lat,
        lng,
        address,
        name: stationName,
        rackCount: 10,
        availableBikeCount: 5,
      }));

      setStations(dummyStations);
    };
    getStationsNearBySelectedPoint();
  }, [selectedPoint]);

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
