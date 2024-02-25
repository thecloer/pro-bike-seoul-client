# Pro Bike Seoul Client

`프로따릉러`는 서울시 공공자전거 따릉이의 실시간 대여소 정보와 경로 탐색 기능을 제공하는 서비스입니다.

프로젝트 소개: [[프로따릉러] 따릉이 경로 추천 서비스](https://blog.thecloer.com/116)

Service: [https://probikeseoul.thecloer.com](https://probikeseoul.thecloer.com)

## Using

- React.js
- Kakao Map API
- tailwindcss

## Folder Structure

```
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components
│   │   ├── CurrentLocationMarker.tsx
│   │   ├── CustomDiv.tsx
│   │   ├── Header.tsx
│   │   ├── MainMap.tsx
│   │   ├── MarkerInfoWindow.tsx
│   │   ├── PanToButton.tsx
│   │   ├── PanToCurrentLocationButton.tsx
│   │   ├── Panel
│   │   │   ├── Panel.tsx
│   │   │   ├── SwapButton.tsx
│   │   │   └── TripPointInput.tsx
│   │   ├── SelectedPointMarker.tsx
│   │   ├── StationMarker.tsx
│   │   ├── StationsNearby.tsx
│   │   ├── Trip.tsx
│   │   └── TripMarker.tsx
│   ├── contexts
│   │   ├── SelectedPointContext.tsx
│   │   └── TripContext.tsx
│   ├── fetches
│   │   ├── server
│   │   │   ├── fetchDirection.ts
│   │   │   └── fetchStationsNearby.ts
│   │   └── thirdParty
│   │       └── fetchKakaoKeywordSearch.ts
│   ├── hooks
│   │   ├── useBounds.ts
│   │   ├── useDebounce.ts
│   │   ├── usePanTo.ts
│   │   └── useWatchPosition.ts
│   ├── lib
│   │   ├── helper.ts
│   │   └── svg
│   │       ├── arrowSwap.svg
│   │       ├── github.svg
│   │       ├── location.svg
│   │       └── rightArrow.svg
│   ├── configs
│   │   ├── api.ts
│   │   ├── defaultValues.ts
│   │   └── siteMeta.ts
│   ├── types
│   │   ├── data.type.ts
│   │   └── response.type.ts
│   └── vite-env.d.ts
└── public
    ├── bike-logo-500.png
    └── bike-logo-600.png
```
