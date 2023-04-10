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

type KakaoApiMethod = 'keywordSearch' | 'coord2Address';

type KakaoApiResponseSuccess<Method extends KakaoApiMethod> = Method extends 'keywordSearch'
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

export type KakaoApiResponse<Method extends KakaoApiMethod> = KakaoApiResponseSuccess<Method> | KakaoApiResponseFail;
