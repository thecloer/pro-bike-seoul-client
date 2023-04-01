import Header from '@/components/Header';
import MainMap from '@/components/MainMap';
import { SelectedPointProvider } from '@/contexts/SelectedPointContext';
import { PathProvider } from '@/contexts/PathContext';

function App() {
  return (
    <main className='h-full flex flex-col'>
      <Header />
      <main className='w-full mx-auto grow relative'>
        <PathProvider>
          <SelectedPointProvider>
            <MainMap />
          </SelectedPointProvider>
        </PathProvider>
      </main>
    </main>
  );
}

export default App;
