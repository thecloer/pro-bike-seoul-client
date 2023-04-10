import type { SeoulBikeStationStatusInfo, ServerStationInfo, StationInfo } from '@/types/data.type';
import type { UseQueryResult } from '@tanstack/react-query';

export const leftJoinStationNearbyAndStationStatus = (
  stationsNearby: ServerStationInfo[],
  stationsStatus: SeoulBikeStationStatusInfo[]
): StationInfo[] =>
  stationsNearby.reduce((acc, stationNearby) => {
    const stationNearbyStatus = stationsStatus.find((stationStatus) => stationStatus.stationId === stationNearby.stationId);
    return stationNearbyStatus
      ? [
          ...acc,
          {
            stationId: stationNearby.stationId,
            lat: stationNearby.lat,
            lng: stationNearby.lng,
            address: stationNearby.address,
            addressName: stationNearby.addressName,
            name: stationNearbyStatus.stationName,
            rackCount: Number(stationNearbyStatus.rackTotCnt),
            availableBikeCount: Number(stationNearbyStatus.parkingBikeTotCnt),
          },
        ]
      : acc;
  }, [] as StationInfo[]);

export const isSuccessAndStale = <D, E>(
  query: UseQueryResult<D, E>
): query is UseQueryResult<D, E> & { isStale: true; isSuccess: true } => query.isSuccess && query.isStale;
