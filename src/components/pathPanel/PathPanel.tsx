import { useState } from 'react';
import PathPointInput from './PathPointInput';
import { useSelectedPoint } from '@/contexts/SelectedPointContext';
import { useRoute } from '@/contexts/TripContext';
import SwapButton from '@/components/SwapButton';
import fetchDirection from '@/fetches/server/fetchDirection';
import useBounds from '@/hooks/useBounds';
import { ReactComponent as RightArrowIcon } from '@/lib/svg/rightArrow.svg';
import { isPosition } from '@/lib/helper';

export default function PathPanel() {
  const { trip, setEndPoint, setStartPoint, swapDestination, setRoute } = useRoute();
  const { setSelectedPoint } = useSelectedPoint();
  const setBounds = useBounds();
  const [showInfo, setShowInfo] = useState(false);

  const route = trip.route;

  const onSearchButtonClick = async () => {
    if (!(isPosition(trip.start) && isPosition(trip.end))) return;

    const res = await fetchDirection(trip.start, trip.end);
    if (!res.success) return console.error(res);

    const route = res.data;
    setRoute(route);

    const { leftBottom, rightTop } = route.summary.bounds;
    setBounds(leftBottom, rightTop);
    setSelectedPoint(null);
    setShowInfo(true);
  };

  const onResetButtonClick = () => {
    setRoute(null);
    setShowInfo(false);
  };

  return (
    <div className='absolute top-0 left-0 flex flex-col w-full sm:max-w-sm'>
      <div className='m-2 rounded-lg shadow-xl border-[1px] bg-white relative'>
        <div className='p-3'>
          <div className='relative flex rounded border border-slate-500'>
            <div className='grow flex flex-col rounded'>
              <PathPointInput point={trip.start} setPoint={setStartPoint} placeholder='출발지' />
              <div className='border-t-[1px] my-[3px]'></div>
              <PathPointInput point={trip.end} setPoint={setEndPoint} placeholder='목적지' />
            </div>
            <div className='absolute right-3 top-0 bottom-0 flex flex-col justify-center'>
              <SwapButton srOnly='출발지 목적지 변경' onClick={swapDestination} />
            </div>
          </div>

          <div className='flex justify-end mt-2'>
            <button
              className='text-sm rounded-md bg-primary-500 text-white font-medium px-3 py-1 hover:bg-primary-600'
              onClick={onSearchButtonClick}
            >
              길찾기
            </button>
          </div>
        </div>

        {route !== null && showInfo ? (
          <div className='border-t-[1px] shadow-inner'>
            <div className='p-3'>
              <div className=''>
                <div className='flex mb-2 items-end justify-between'>
                  <div>
                    <span className='font-medium text-xl'>{Math.ceil(route.summary.time / 60)}분</span>
                    <span className='ml-2 text-sm text-slate-600'>{route.summary.distance}km</span>
                  </div>

                  <button
                    className='text-sm rounded-md bg-primary-500 text-white font-medium px-3 py-1 hover:bg-primary-600'
                    onClick={onResetButtonClick}
                  >
                    초기화
                  </button>
                </div>
                <div className='flex items-center text-sm'>
                  <span>{trip.start.text}</span>
                  <RightArrowIcon className='w-5 h-5 text-slate-600 mx-3' />
                  <span>{trip.end.text}</span>
                </div>
              </div>

              <div className='max-h-[calc(100vh-22rem)] overflow-scroll my-4'>
                {route.maneuvers.map((maneuver, i) => (
                  <div key={i} className='flex items-center py-2 text-slate-700 gap-2'>
                    <div className='w-5 h-5 rounded-full bg-primary-200 flex items-center justify-center'>
                      <span className='text-white text-sm'>{i + 1}</span>
                    </div>
                    <div className='text-sm break-all'>{maneuver.instructions.instruction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {route === null ? null : (
          <button
            className={`group border px-2 absolute bottom-0 left-6 -translate-x-1/2 bg-inherit ${
              showInfo ? 'rounded-t pt-1' : 'rounded-b pb-1 translate-y-full'
            }`}
            onClick={() => setShowInfo((prev) => !prev)}
          >
            <div
              className={`border-8 border-x-transparent w-0 h-0 ${
                showInfo
                  ? 'border-b-primary-500 group-hover:border-b-primary-600 border-t-0'
                  : 'border-t-primary-500 group-hover:border-t-primary-600 border-b-0'
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
