import SwapButton from '@/components/SwapButton';
import PathPointInput from './PathPointInput';
import { usePath } from '@/contexts/PathContext';

export default function PathPanel() {
  const { path, setEndPoint, setStartPoint, swapDestination } = usePath();

  const onSearchButtonClick = () => {}; // TODO: Implement

  return (
    <div className='absolute top-0 left-0 flex flex-col w-full sm:max-w-sm'>
      <div className='m-2 rounded-lg shadow-xl border-[1px] bg-white'>
        <div className='px-3 py-3'>
          <div className='relative flex rounded border border-slate-500'>
            <div className='grow flex flex-col rounded'>
              <PathPointInput point={path.start} setPoint={setStartPoint} placeholder='출발지' />
              <div className='border-t-[1px] my-[3px]'></div>
              <PathPointInput point={path.end} setPoint={setEndPoint} placeholder='목적지' />
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
        {/* <div className='h-32 border-t-[1px] shadow-inner'></div> */}
      </div>
    </div>
  );
}
