import Header from '@/components/Header';
import MainMap from '@/components/MainMap';

function App() {
  return (
    <main className='h-full flex flex-col'>
      <Header />
      <main className='w-full mx-auto grow relative'>
        <MainMap />
      </main>
    </main>
  );
}

export default App;
