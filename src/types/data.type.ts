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

export type PathData = {
  distance: number;
  time: number;
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  points: Position[]; // [lon, lat] or [lon, lat, ele]
  waypoints: Position[];
};

export type Route = {
  summary: {
    points: Position[];
    bounds: {
      leftBottom: Position;
      rightTop: Position;
    };
    time: number; // seconds
    distance: number;
  };
  shapes: {
    encodedPolyline: string;
    bounds: {
      leftBottom: Position;
      rightTop: Position;
    };
  }[];
  maneuvers: {
    time: number;
    distance: number;
    shapeIndex: {
      legNumber: number; // which shape in shapes
      begin: number; // begin in the shape
      end: number; // end in the shape
    };
    instructions: {
      instruction: string;
      postTransition?: string;
      preTransition?: string;
      transitionAlert?: string;
    };
  }[];
};

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

type SearchKeyword = {
  text: string;
};

export type SelectedPoint = (PositionInfo & Partial<SearchKeyword>) | null;

export type RouteEndPoint = SearchKeyword & (PositionInfo | {});
