import { SEOUL_BIKE_STATION_STATUS_API_RESULTS, makeBikeListUrl } from '@/configs/api';
import { SeoulBikeStationStatusInfo } from '@/types/entity.type';
import { ApiResponse, SeoulBikeStationStatusApiResponse, SeoulBikeStationStatusApiResponseSuccess } from '@/types/response.type';

const isSuccess = (
  response: SeoulBikeStationStatusApiResponse['rentBikeStatus']
): response is SeoulBikeStationStatusApiResponseSuccess =>
  SEOUL_BIKE_STATION_STATUS_API_RESULTS.SUCCESS.some(({ CODE }) => CODE === response.RESULT.CODE);

const fetchStationStatus = async (startIdx: number, endIdx: number): Promise<ApiResponse<SeoulBikeStationStatusInfo[]>> => {
  const url = makeBikeListUrl(startIdx, endIdx);

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
    console.log('ERROR in fetchStationStatus');
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

export default fetchStationStatus;
