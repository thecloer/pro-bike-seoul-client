import type { PropsWithChildren } from 'react';

export default function MarkerInfoWindow({ children }: PropsWithChildren) {
  return (
    <div className='absolute -top-2/3 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col bg-white py-2 px-3 rounded-lg shadow border-2 border-primary-600 text-sm text-slate-800'>
      {children}
      <div className='absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-primary-600' />
    </div>
  );
}
