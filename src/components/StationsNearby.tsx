import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import useStationsNearby from '@/hooks/queries/useStationsNearby';
import StationMarker from '@/components/StationMarker';

export default function StationsNearby() {
  const { selectedPoint } = useSelectedPoint();
  const stationsQuery = useStationsNearby(selectedPoint);
  if (!stationsQuery.isSuccess) return null;
  return (
    <>
      {stationsQuery.data.map((station) => (
        <StationMarker key={station.stationId} station={station} />
      ))}
    </>
  );
}
