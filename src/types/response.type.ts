import { SEOUL_BIKE_STATION_STATUS_API } from '@/configs/api';
import { SeoulBikeStationStatusInfo } from '@/types/data.type';

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

/**
 * Seoul Bike Station Status API
 */

// https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#
export type SeoulBikeStationStatusApiResponseSuccess = {
  RESULT: typeof SEOUL_BIKE_STATION_STATUS_API.RESULTS.SUCCESS[number];
  list_total_count: number;
  row: SeoulBikeStationStatusInfo[];
};
type SeoulBikeStationStatusApiResponseFail = {
  RESULT: typeof SEOUL_BIKE_STATION_STATUS_API.RESULTS.FAIL[number];
};
export type SeoulBikeStationStatusApiResponse = {
  rentBikeStatus: SeoulBikeStationStatusApiResponseSuccess | SeoulBikeStationStatusApiResponseFail;
};

/**
 * Kakao REST API
 */

// Kakao REST API: keywordSearch
// https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
// https://developers.kakao.com/tool/rest-api/open/get/v2-local-search-keyword.%7Bformat%7D
export type KakaoPlace = kakao.maps.services.PlacesSearchResultItem;
type KakaoPlaceMeta = {
  is_end: boolean;
  total_count: number;
  pageable_count: number;
  same_name: {
    keyword: string;
    region: string[];
    selected_region: string;
  };
};

// Kakao REST API: coord2Address
// https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address
// https://developers.kakao.com/tool/rest-api/open/get/v2-local-geo-coord2address.%7Bformat%7D
type KakaoTotalAddress = {
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
};
type KakaoLocalMeta = {
  total_count: number;
};

type KakaoApiResponseSuccess<Method extends 'keywordSearch' | 'coord2Address'> = Method extends 'keywordSearch'
  ? {
      meta: KakaoPlaceMeta;
      documents: KakaoPlace[];
    }
  : Method extends 'coord2Address'
  ? {
      meta: KakaoLocalMeta;
      documents: KakaoTotalAddress[];
    }
  : never;

type KakaoApiResponseFail = {
  errorType: 'AccessDeniedError';
  message: string;
};

export type KakaoApiResponse<Method extends 'keywordSearch' | 'coord2Address'> =
  | KakaoApiResponseSuccess<Method>
  | KakaoApiResponseFail;
