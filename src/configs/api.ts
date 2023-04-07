// Server API
export const SERVER_API = {
  URL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
} as const;

// Seoul Bike API
export const SEOUL_BIKE_STATION_STATUS_API = {
  // https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#
  RESULTS: {
    SUCCESS: [{ CODE: 'INFO-000', MESSAGE: '정상 처리되었습니다' }],
    FAIL: [
      { CODE: 'ERROR-300', MESSAGE: '필수 값이 누락되어 있습니다.' },
      { CODE: 'INFO-100', MESSAGE: '인증키가 유효하지 않습니다.' },
      { CODE: 'ERROR-301', MESSAGE: '파일타입 값이 누락 혹은 유효하지 않습니다.' },
      { CODE: 'ERROR-310', MESSAGE: '해당하는 서비스를 찾을 수 없습니다.' },
      { CODE: 'ERROR-331', MESSAGE: '요청시작위치 값을 확인하십시오.' },
      { CODE: 'ERROR-332', MESSAGE: '요청종료위치 값을 확인하십시오.' },
      { CODE: 'ERROR-333', MESSAGE: '요청위치 값의 타입이 유효하지 않습니다.' },
      { CODE: 'ERROR-334', MESSAGE: '요청종료위치 보다 요청시작위치가 더 큽니다.' },
      { CODE: 'ERROR-335', MESSAGE: '샘플데이터(샘플키:sample) 는 한번에 최대 5건을 넘을 수 없습니다.' },
      { CODE: 'ERROR-336', MESSAGE: '데이터요청은 한번에 최대 1000건을 넘을 수 없습니다.' },
      { CODE: 'ERROR-500', MESSAGE: '서버 오류입니다.' },
      { CODE: 'ERROR-600', MESSAGE: '데이터베이스 연결 오류입니다.' },
      { CODE: 'ERROR-601', MESSAGE: 'SQL 문장 오류 입니다.' },
      { CODE: 'INFO-200', MESSAGE: '해당하는 데이터가 없습니다.' },
    ],
  },
  DATA: {
    TOTAL_COUNT: 2700, // 2692 stations
    CHUNK_COUNT: 3,
  },
  makeUrl: (startIdx: number, endIdx: number) =>
    `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_SEOUL_BIKE_KEY}/json/bikeList/${startIdx}/${endIdx}`,
} as const;

// Kakao REST API
export const KAKAO_REST_API = {
  AUTHORIZATION_HEADER: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}` },
} as const;
