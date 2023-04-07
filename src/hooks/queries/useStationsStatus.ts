import type { SeoulBikeStationStatusInfo } from '@/types/data.type';
import type { ApiResponse } from '@/types/response.type';
import { useQueries } from '@tanstack/react-query';
import fetchStationsStatus from '@/fetches/thirdParty/fetchStationsStatus';
import { SEOUL_BIKE_STATION_STATUS_API } from '@/configs/api';

const { CHUNK_COUNT, TOTAL_COUNT } = SEOUL_BIKE_STATION_STATUS_API.DATA;
const CHUNK_LENGTH = Math.ceil(TOTAL_COUNT / CHUNK_COUNT);

const stationStatusIndexes = Array.from({ length: CHUNK_COUNT }, (_, i) => ({
  startIdx: i * CHUNK_LENGTH + 1,
  endIdx: (i + 1) * CHUNK_LENGTH,
}));

export default function useStationsStatus() {
  return useQueries({
    queries: stationStatusIndexes.map(({ startIdx, endIdx }) => ({
      queryKey: ['stationStatus', startIdx, endIdx],
      queryFn: () => fetchStationsStatus(startIdx, endIdx),
      select: (response: ApiResponse<SeoulBikeStationStatusInfo[]>) => {
        if (response.success) return response.data;
        console.log('ERROR in stationsStatusQueries');
        console.error(response);
        return [];
      },
      staleTime: 5 * 1000,
      refetchInterval: 30 * 1000, // 대여소 상태 정보 자동 새로고침 주기
      cacheTime: Infinity,
    })),
  });
}
