import { Position } from './geo.type';

export type ServerStationInfo = Position & {
  id: number;
  stationId: string;
  address: string;
  stationName: string;
};

/**
 * @see https://data.seoul.go.kr/dataList/OA-15493/A/1/datasetView.do#
 *
 * @property stationId - 대여소 고유 id
 * @property stationName - 대여소 이름
 * @property stationLatitude - 대여소 위도
 * @property stationLongitude - 대여소 경도
 * @property rackTotCnt - 거치대개수
 * @property parkingBikeTotCnt - 자전거주차총건수
 * @property shared - 거치율 = parkingBikeTotCnt / rackTotCnt
 */
export type SeoulBikeStationStatusInfo = {
  stationId: string; // 'ST-4'
  stationName: string; // '102. 망원역 1번출구 앞'
  stationLatitude: string; // '37.55564880'
  stationLongitude: string; // '126.91062927'
  rackTotCnt: string; // 거치대개수
  parkingBikeTotCnt: string; // 자전거주차총건수
  shared: string; // 거치율 = parkingBikeTotCnt / rackTotCnt
};

export type StationInfo = Position & {
  id: string;
  name: string;
  address: string;
  rackCount: number;
  availableBikeCount: number;
};