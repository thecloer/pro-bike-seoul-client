import Header from '@/components/Header';
import { Map } from 'react-kakao-maps-sdk';
import { UOS_POSITION } from './config/defaultValues';

function App() {
  return (
    <main className='h-full flex flex-col'>
      <Header />
      <main className='w-full mx-auto grow relative'>
        <Map center={UOS_POSITION} className='w-full h-full z-0'></Map>
      </main>
    </main>
  );
}

export default App;
