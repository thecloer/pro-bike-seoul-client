import { Position } from '@/types/data.type';

export const setDomHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const isPosition = <T extends Position>(point: any): point is T => 'lat' in point && 'lng' in point;
export const positionFilter = <T extends Position>(point: T): Position => ({
  lat: point.lat,
  lng: point.lng,
});
