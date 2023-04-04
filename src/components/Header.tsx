import siteMeta from '@/configs/siteMeta';
import { ReactComponent as GithubIcon } from '@/lib/svg/github.svg';

function Header() {
  return (
    <header className='border-b-2'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <img src='/bike-logo-500.png' alt='bike logo' className='w-8 h-8' />
          <span className='text-xl font-semibold'>프로 따릉러</span>
        </div>
        <div>
          <a href={siteMeta.githubUrl} className='text-primary-400 transition-colors hover:text-primary-500'>
            <span className='sr-only'>github link</span>
            <GithubIcon className='w-6 h-6' />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
