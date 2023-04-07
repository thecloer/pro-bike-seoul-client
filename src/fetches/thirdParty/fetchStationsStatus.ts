import { SEOUL_BIKE_STATION_STATUS_API } from '@/configs/api';
import { SeoulBikeStationStatusInfo } from '@/types/data.type';
import { ApiResponse, SeoulBikeStationStatusApiResponse, SeoulBikeStationStatusApiResponseSuccess } from '@/types/response.type';

const isSuccess = (
  response: SeoulBikeStationStatusApiResponse['rentBikeStatus']
): response is SeoulBikeStationStatusApiResponseSuccess =>
  SEOUL_BIKE_STATION_STATUS_API.RESULTS.SUCCESS.some(({ CODE }) => CODE === response.RESULT.CODE);

const fetchStationsStatus = async (startIdx: number, endIdx: number): Promise<ApiResponse<SeoulBikeStationStatusInfo[]>> => {
  const url = SEOUL_BIKE_STATION_STATUS_API.makeUrl(startIdx, endIdx);

  try {
    const { rentBikeStatus: response }: SeoulBikeStationStatusApiResponse = await fetch(url, {
      method: 'GET',
    }).then((res) => res.json());

    return isSuccess(response)
      ? {
          success: true,
          data: response.row,
        }
      : {
          success: false,
          url,
          statusCode: 500,
          error: response.RESULT.CODE,
          message: response.RESULT.MESSAGE,
        };
  } catch (error) {
    console.log('ERROR in fetchStationsStatus');
    console.error(error);
    return {
      success: false,
      url,
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Internal Server Error',
    };
  }
};

export default fetchStationsStatus;
