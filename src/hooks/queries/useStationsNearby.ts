import type { SelectedPoint } from '@/types/data.type';
import { useQuery } from '@tanstack/react-query';
import fetchStationsNearby from '@/fetches/server/fetchStationsNearby';

export default function useStationsNearby(selectedPoint: SelectedPoint) {
  return useQuery({
    queryKey: ['stationNearby', selectedPoint],
    queryFn: () => selectedPoint && fetchStationsNearby(selectedPoint),
    enabled: !!selectedPoint,
    select: (response) => {
      if (response?.success) return response.data;
      console.log('ERROR in stationsNearbyQuery');
      console.error(response);
      return [];
    },
    cacheTime: selectedPoint?.text ? 5 * 60 * 1000 : 0, // 검색결과 주변 대여소 검색결과 캐시
    staleTime: Infinity,
  });
}
