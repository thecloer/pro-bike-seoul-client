import Header from '@/components/Header';
import MainMap from '@/components/MainMap';
import { SelectedPointProvider } from '@/contexts/SelectedPointContext';
import { RouteProvider } from '@/contexts/TripContext';

function App() {
  return (
    <main className='h-full flex flex-col'>
      <Header />
      <main className='w-full mx-auto grow relative'>
        <RouteProvider>
          <SelectedPointProvider>
            <MainMap />
          </SelectedPointProvider>
        </RouteProvider>
      </main>
    </main>
  );
}

export default App;
