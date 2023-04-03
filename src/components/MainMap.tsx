import type { SeoulBikeStationStatusInfo, StationInfo } from '@/types/entity.type';
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
      const stationNearbyPromise = fetchStationsNearby(selectedPoint);
      // TODO: cache station status. not fetch every time
      const stationStatusPromise1 = fetchStationStatus(1, 1000);
      const stationStatusPromise2 = fetchStationStatus(1001, 2000);
      const stationStatusPromise3 = fetchStationStatus(2001, 3000);

      const stationNearbyResult = await stationNearbyPromise;
      if (!stationNearbyResult.success) return console.log(stationNearbyResult); // TODO: error handling
      const nearStations = stationNearbyResult.data;

      // TODO: cache station status. not fetch every time
      const settledStationStatus = await Promise.allSettled([
        stationStatusPromise1,
        stationStatusPromise2,
        stationStatusPromise3,
      ]);
      const stationStatusResult = settledStationStatus.reduce((acc, cur) => {
        return cur.status === 'fulfilled' && cur.value.success ? [...acc, ...cur.value.data] : acc;
      }, [] as SeoulBikeStationStatusInfo[]);

      // Left join station nearby and station status
      const stationInfos = nearStations.reduce((acc, station) => {
        const nearStationStatus = stationStatusResult.find((stationStatus) => stationStatus.stationId === station.stationId);
        return nearStationStatus
          ? [
              ...acc,
              {
                id: station.stationId,
                lat: station.lat,
                lng: station.lng,
                address: station.address,
                addressName: station.addressName,
                name: nearStationStatus.stationName,
                rackCount: Number(nearStationStatus.rackTotCnt),
                availableBikeCount: Number(nearStationStatus.parkingBikeTotCnt),
              },
            ]
          : acc;
      }, [] as StationInfo[]);

      setStations(stationInfos);
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
