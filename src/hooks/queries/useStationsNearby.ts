import type { SelectedPoint } from '@/types/data.type';
import fetchStationsNearby from '@/fetches/server/fetchStationsNearby';
import { useQuery } from '@tanstack/react-query';

export default function useStationsNearby(selectedPoint: SelectedPoint) {
  return useQuery({
    queryKey: ['useStationsNearby', selectedPoint],
    queryFn: () => selectedPoint && fetchStationsNearby(selectedPoint),
    enabled: !!selectedPoint,
    select: (response) => {
      if (response?.success) return response.data;
      console.log('ERROR in useStationsNearby');
      console.error(response);
      return [];
    },
    cacheTime: selectedPoint?.text ? 5 * 60 * 1000 : 0, // 검색결과 주변 대여소 검색결과 캐시
    staleTime: Infinity,
  });
}
