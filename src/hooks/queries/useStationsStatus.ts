import type { SeoulBikeStationStatusInfo } from '@/types/data.type';
import type { ApiResponse } from '@/types/response.type';
import { useQueries } from '@tanstack/react-query';
import fetchStationsStatus from '@/fetches/thirdParty/fetchStationsStatus';

const stationStatusIndexes = [
  { startIdx: 1, endIdx: 1000 },
  { startIdx: 1001, endIdx: 2000 },
  { startIdx: 2001, endIdx: 3000 },
] as const;

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
