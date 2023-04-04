import type { Position } from '@/types/geo.type';
import { SERVER_API_URL } from '@/configs/api';
import { ApiResponse } from '@/types/response.type';
import { ServerStationInfo } from '@/types/data.type';

const SEARCH_RADIUS = 600; // meters

const fetchStationsNearby = async (point: Position): Promise<ApiResponse<ServerStationInfo[]>> => {
  const url = new URL(`${SERVER_API_URL}/bike/stations/nearby`);
  url.searchParams.append('lat', point.lat.toString());
  url.searchParams.append('lng', point.lng.toString());
  url.searchParams.append('radius', SEARCH_RADIUS.toString());

  try {
    const response: ApiResponse<ServerStationInfo[]> = await fetch(url, {
      method: 'GET',
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.log('ERROR in fetchStationsNearby');
    console.error(error);
    return {
      success: false,
      url: url.toString(),
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Internal Server Error',
    };
  }
};

export default fetchStationsNearby;
