import type { KakaoPlace } from '@/types/response.type';
import type { RouteEndPoint } from '@/types/data.type';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import fetchKakaoKeywordSearch from '@/fetches/thirdParty/fetchKakaoKeywordSearch';

type Props = {
  placeholder?: string;
  point: RouteEndPoint;
  setPoint: (point: RouteEndPoint) => void;
};

export default function PathPointInput({ placeholder, point, setPoint }: Props) {
  const { setSelectedPoint } = useSelectedPoint();
  const [isListOpen, setIsListOpen] = useState(false);

  const [searchResult, setSearchResult] = useState<KakaoPlace[]>([]);
  const searchKeyword = useDebounce(point.text, 500);

  const selectItem = (item: KakaoPlace) => {
    const point: RouteEndPoint = {
      text: item.place_name,
      lat: Number(item.y),
      lng: Number(item.x),
      name: item.place_name,
      address: item.address_name,
      roadAddress: item.road_address_name,
    };

    setSelectedPoint(point);
    setPoint(point);
    setIsListOpen(false);
  };

  useEffect(() => {
    if (searchKeyword === '') {
      setSearchResult([]);
      return;
    }
    const getSearchKeywordResult = async () => {
      const result = await fetchKakaoKeywordSearch(searchKeyword);
      if (result.success) return setSearchResult(result.data);
      console.error(result);
      setSearchResult([]);
    };
    getSearchKeywordResult();
  }, [searchKeyword]);

  return (
    <div className='relative'>
      <input
        type='text'
        className='w-full text-base py-2 pl-6 pr-14 focus:outline-none focus:ring-4 rounded focus:ring-blue-500/70'
        placeholder={placeholder}
        value={point.text}
        onChange={(e) => setPoint({ text: e.target.value })}
        onClick={() => setIsListOpen((prev) => !prev)}
        onBlur={(e) => setIsListOpen(false)}
      />

      <div
        className={`z-10 absolute left-0 right-0 top-full bg-white border rounded-b shadow-md ${
          isListOpen && searchResult.length > 0 ? 'block' : 'hidden'
        }`}
      >
        <ul className='divide-y'>
          {searchResult.map((item) => (
            <li
              key={item.id}
              className='flex flex-col px-6 py-3 hover:bg-primary-100 cursor-pointer'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectItem(item)}
            >
              <div className='flex justify-between items-baseline'>
                <span className='text-base'>{item.place_name}</span>
                <span className='text-xs text-slate-500'>{item.category_group_name}</span>
              </div>

              <span className='text-xs text-slate-500'>{item.address_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
