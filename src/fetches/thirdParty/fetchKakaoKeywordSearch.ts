import { KAKAO_REST_API } from '@/configs/api';
import { ApiResponse, KakaoApiResponse, KakaoPlace } from '@/types/response.type';

const fetchKakaoKeywordSearch = async (
  query: string,
  options?: Pick<kakao.maps.services.PlacesSearchOptions, 'page' | 'size'>
): Promise<ApiResponse<KakaoPlace[]>> => {
  const url = new URL(`${KAKAO_REST_API.LOCAL_URL}/search/keyword.json`);
  url.searchParams.append('query', query);
  url.searchParams.append('page', options?.page?.toString() ?? '1');
  url.searchParams.append('size', options?.size?.toString() ?? '10');
  url.searchParams.append('rect', '126.734086,37.413294,127.269311,37.715133');

  try {
    const response: KakaoApiResponse<'keywordSearch'> = await fetch(url, {
      method: 'GET',
      headers: KAKAO_REST_API.AUTHORIZATION_HEADER,
    }).then((res) => res.json());

    if ('documents' in response) {
      return {
        success: true,
        data: response.documents,
      };
    }

    return {
      success: false,
      url: url.toString(),
      statusCode: 403,
      error: response.errorType,
      message: response.message,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      url: url.toString(),
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'ERROR in fetchKakaoKeywordSearch',
    };
  }
};

export default fetchKakaoKeywordSearch;
