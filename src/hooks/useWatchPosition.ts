import type { Position } from '@/types/geo.type';
import { useState, useEffect } from 'react';

type WatchPositionState =
  | {
      loaded: true;
      coords: Position;
    }
  | {
      loaded: false;
      error: { code: number; message: string };
    };

const useWatchPosition = () => {
  const [state, setState] = useState<WatchPositionState>({
    loaded: false,
    error: { code: 0, message: 'Not initialized.' },
  });

  useEffect(() => {
    if (!('geolocation' in navigator)) return;

    const onSuccess = (position: GeolocationPosition) =>
      setState({
        loaded: true,
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });

    // Error codes: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
    // + { code: 0, message: 'Not initialized.' }
    const onError = (error: GeolocationPositionError) =>
      setState({
        loaded: false,
        error: { code: error.code, message: error.message },
      });

    const options: PositionOptions = {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true,
    };

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
};

export default useWatchPosition;
