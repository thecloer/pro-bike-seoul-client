// Server API
export const SERVER_API = {
  URL: `${import.meta.env.MODE === 'production' ? import.meta.env.BASE_URL : import.meta.env.VITE_SERVER_URL}/api/v1`,
} as const;

// Kakao REST API
export const KAKAO_REST_API = {
  LOCAL_URL: 'https://dapi.kakao.com/v2/local',

  AUTHORIZATION_HEADER: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`,
    'Content-Type': 'application/json',
  },
} as const;
