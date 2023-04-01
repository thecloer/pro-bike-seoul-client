import { ReactComponent as ArrowSwap } from '@/lib/svg/arrowSwap.svg';

type Props = {
  srOnly?: string;
  onClick?: () => void;
};

export default function SwapButton({ srOnly, onClick }: Props) {
  return (
    <button
      className='rounded-full p-1 border bg-white border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-colors'
      onClick={onClick}
    >
      <span className='sr-only'>{srOnly}</span>
      <ArrowSwap className='w-6 h-6' />
    </button>
  );
}
