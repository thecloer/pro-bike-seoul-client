import type { SelectedPoint } from '@/types/data.type';
import type { SeoulBikeStationStatusInfo, StationInfo } from '@/types/data.type';
import { isSuccessAndStale, leftJoinStationNearbyAndStationStatus } from '@/lib/helpers';
import useStationsNearby from '@/hooks/queries/useStationsNearby';
import useStationsStatus from '@/hooks/queries/useStationsStatus';

export default function useStationsNearbyStatus(point: SelectedPoint) {
  const stationsNearbyQuery = useStationsNearby(point);
  const stationsStatusQueries = useStationsStatus();

  if (point === null)
    return {
      stations: [] as StationInfo[],
      isSuccess: false,
    } as const;

  const stationsStatus = stationsStatusQueries.reduce(
    (acc, query) => (query.isSuccess ? [...acc, ...query.data] : acc),
    [] as SeoulBikeStationStatusInfo[]
  );

  const stationsNearby = stationsNearbyQuery.isSuccess ? stationsNearbyQuery.data : [];
  const stations = leftJoinStationNearbyAndStationStatus(stationsNearby, stationsStatus);

  const refetchStatus = () => {
    const staledStationsStatusQueries = stationsStatusQueries.filter(isSuccessAndStale);
    for (const { data, refetch } of staledStationsStatusQueries) {
      const shouldThisQueryRefetch = data.some((stationStatus) =>
        stationsNearby.some((stationNearby) => stationNearby.stationId === stationStatus.stationId)
      );
      if (shouldThisQueryRefetch) refetch();
    }
  };

  return {
    stations,
    isSuccess: stationsNearbyQuery.isSuccess && stationsStatusQueries.every((query) => query.isSuccess),
    refetchStatus,
  };
}
