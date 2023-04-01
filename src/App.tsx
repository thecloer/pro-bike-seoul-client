import Header from '@/components/Header';
import MainMap from '@/components/MainMap';
import { SelectedPointProvider } from '@/contexts/SelectedPointContext';

function App() {
  return (
    <main className='h-full flex flex-col'>
      <Header />
      <main className='w-full mx-auto grow relative'>
        <SelectedPointProvider>
          <MainMap />
        </SelectedPointProvider>
      </main>
    </main>
  );
}

export default App;
