// server data types

/**
 * @property stationId - 대여소 고유 id
 * @property lat - 대여소 위도
 * @property lng - 대여소 경도
 * @property address - 대여소 주소
 * @property addressName - 대여소 주소명
 * @property stationName - 대여소 이름
 * @property rackCount - 거치대개수
 * @property availableBikeCount - 자전거주차총건수
 */
export type ServerStationInfo = Position & {
  stationId: string;
  address: string;
  addressName: string;
  stationName: string;
  rackCount: number;
  availableBikeCount: number;
};

// Kakao API data types

// Client data types

export type Position = {
  lat: number;
  lng: number;
};

// kakao.maps.services.PlacesSearchResultItem
export type PositionInfo = Position & {
  name?: string;
  address?: string;
  roadAddress?: string;
};

type SearchKeywordInfo = {
  text: string;
};

export type SelectedPoint = (PositionInfo & Partial<SearchKeywordInfo>) | null;

export type PathPointInfo = SearchKeywordInfo | (SearchKeywordInfo & PositionInfo);
