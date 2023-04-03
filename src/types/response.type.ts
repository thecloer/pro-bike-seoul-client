import { SEOUL_BIKE_STATION_STATUS_API_RESULTS } from '@/configs/api';
import { SeoulBikeStationStatusInfo } from '@/types/entity.type';

type ApiResponseSuccess<Data> = {
  success: true;
  data: Data;
};
type ApiResponseFail = {
  success: false;
  url: string;
  statusCode: number;
  error: string;
  message: string | string[];
};
export type ApiResponse<Data> = ApiResponseSuccess<Data> | ApiResponseFail;

// https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#
export type SeoulBikeStationStatusApiResponseSuccess = {
  RESULT: typeof SEOUL_BIKE_STATION_STATUS_API_RESULTS.SUCCESS[number];
  list_total_count: number;
  row: SeoulBikeStationStatusInfo[];
};
type SeoulBikeStationStatusApiResponseFail = {
  RESULT: typeof SEOUL_BIKE_STATION_STATUS_API_RESULTS.FAIL[number];
};
export type SeoulBikeStationStatusApiResponse = {
  rentBikeStatus: SeoulBikeStationStatusApiResponseSuccess | SeoulBikeStationStatusApiResponseFail;
};
