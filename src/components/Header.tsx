import siteMeta from '@/config/siteMeta';
import { ReactComponent as GithubIcon } from '@/lib/svg/github.svg';

function Header() {
  return (
    <header className='border-b-2'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='text-xl font-semibold'>프로 따릉러</div>
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
