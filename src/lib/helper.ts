import { Position } from '@/types/data.type';

export const isPosition = <T extends Position>(point: any): point is T => 'lat' in point && 'lng' in point;
export const positionFilter = <T extends Position>(point: T): Position => ({
  lat: point.lat,
  lng: point.lng,
});
