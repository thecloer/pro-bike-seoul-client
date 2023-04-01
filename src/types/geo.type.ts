export type Position = {
  lat: number;
  lng: number;
};

// kakao.maps.services.PlacesSearchResultItem
export type PositionInfo = Position & {
  id?: string;
  name?: string;
  addressName?: string;
  roadAddressName?: string;
};