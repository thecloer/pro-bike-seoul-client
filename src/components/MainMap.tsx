import { Map } from 'react-kakao-maps-sdk';
import { UOS_POSITION } from '@/config/defaultValues';

export default function MainMap() {
  return <Map center={UOS_POSITION} className='w-full h-full z-0'></Map>;
}
