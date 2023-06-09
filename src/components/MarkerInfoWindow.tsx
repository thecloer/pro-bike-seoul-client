import type { PropsWithChildren } from 'react';

export default function MarkerInfoWindow({ children }: PropsWithChildren) {
  return (
    <div className='absolute -top-2/3 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col bg-white py-2 px-3 rounded-lg shadow border-2 border-primary-600 text-sm text-slate-800 z-10'>
      {children}
      <div className='absolute top-full left-0 right-0 flex justify-center min-h-[2rem]'>
        <div className='border-8 border-transparent border-t-primary-600' />
      </div>
    </div>
  );
}
