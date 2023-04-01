import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { PathPointInfo } from '@/contexts/PathContext';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';

type Props = {
  placeholder?: string;
  point: PathPointInfo;
  setPoint: (point: PathPointInfo) => void;
};

export default function PathPointInput({ placeholder, point, setPoint }: Props) {
  const { setSelectedPoint } = useSelectedPoint();
  const [isListOpen, setIsListOpen] = useState(false);

  const [searchResult, setSearchResult] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const searchKeyword = useDebounce(point.text, 500);

  const selectItem = (item: kakao.maps.services.PlacesSearchResultItem) => {
    const point: PathPointInfo = {
      text: item.place_name,
      lat: Number(item.y),
      lng: Number(item.x),
      name: item.place_name,
      id: item.id,
      addressName: item.address_name,
      roadAddressName: item.road_address_name,
    };
    console.log(point);

    setSelectedPoint(point);
    setPoint(point);
    setIsListOpen(false);
  };

  useEffect(() => {
    if (searchKeyword === '') {
      setSearchResult([]);
      return;
    }

    // TODO: add react-query
    const ps = new kakao.maps.services.Places();
    const options: kakao.maps.services.PlacesSearchOptions = {
      size: 10, // 1 ~ 15
    };

    ps.keywordSearch(
      searchKeyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) setSearchResult(data);
        else if (status === kakao.maps.services.Status.ZERO_RESULT) setSearchResult([]);
      },
      options
    );
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