import type { Position, Route } from '@/types/data.type';
import { SERVER_API } from '@/configs/api';
import { ApiResponse } from '@/types/response.type';
import { positionFilter } from '@/lib/helper';

const fetchDirection = async (origin: Position, destination: Position): Promise<ApiResponse<Route>> => {
  const url = `${SERVER_API.URL}/bike/routes/directions`;

  try {
    const response: ApiResponse<Route> = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        origin: positionFilter(origin),
        destination: positionFilter(destination),
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      url: url,
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'ERROR in fetchDirection',
    };
  }
};

export default fetchDirection;
