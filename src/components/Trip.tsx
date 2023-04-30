import { useRoute } from '@/contexts/TripContext';
import { Polyline } from 'react-kakao-maps-sdk';
import { decode as polylineDecoder } from '@mapbox/polyline';
import TripMarker from './TripMarker';

export default function Trip() {
  const { trip } = useRoute();

  if (trip.route === null) return null;

  const points = trip.route.summary.points;
  const path = trip.route.shapes.map(({ encodedPolyline }) =>
    polylineDecoder(encodedPolyline, 6).map((latLngTuple) => ({ lat: latLngTuple[0], lng: latLngTuple[1] }))
  );

  return (
    <>
      {points.map((point, index) => (
        <TripMarker
          key={index}
          position={point}
          type={index === 0 ? 'origin' : index === points.length - 1 ? 'destination' : 'waypoint'}
        />
      ))}
      <Polyline path={path} strokeStyle='solid' strokeColor='#1D4FD9' strokeOpacity={0.9} strokeWeight={6} />
    </>
  );
}
