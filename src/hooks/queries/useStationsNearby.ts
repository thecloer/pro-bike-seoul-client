import type { Position } from '@/types/geo.type';
import { useQuery } from '@tanstack/react-query';
import fetchStationsNearby from '@/fetches/server/fetchStationsNearby';

export default function useStationsNearby(point: Position | null) {
  return useQuery({
    queryKey: ['stationNearby', point],
    queryFn: () => point && fetchStationsNearby(point),
    enabled: !!point,
    select: (response) => {
      if (response?.success) return response.data;
      console.log('ERROR in stationsNearbyQuery');
      console.error(response);
      return [];
    },
    cacheTime: point ? 5 * 60 * 1000 : Infinity, // 좌표 별 주변 대여소 검색결과 캐시
    staleTime: Infinity,
  });
}
