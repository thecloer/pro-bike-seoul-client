import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import StationMarker from '@/components/StationMarker';
import { useEffect, useState } from 'react';
import fetchStationsNearby from '@/fetches/server/fetchStationsNearby';
import { ServerStationInfo } from '@/types/data.type';

export default function StationsNearby() {
  const { selectedPoint } = useSelectedPoint();
  const [stationsNearby, setStationsNearby] = useState<ServerStationInfo[]>([]);
  useEffect(() => {
    if (selectedPoint === null) return;
    const getStationsNearby = async () => {
      const response = await fetchStationsNearby(selectedPoint);
      if (!response.success) {
        console.error(response);
        setStationsNearby([]);
        return;
      }
      setStationsNearby(response.data);
    };
    getStationsNearby();
  }, [selectedPoint]);

  return (
    <>
      {stationsNearby.map((station) => (
        <StationMarker key={station.stationId} station={station} />
      ))}
    </>
  );
}
