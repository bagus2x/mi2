'use client'

import CircularIndicator from '@mi/app/components/circular-indicator';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((component) => component.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className='aspect-auto w-full h-full grid place-items-center'>
        <CircularIndicator />
      </div>
    )
  }
);
const Popup = dynamic(() => import('react-leaflet').then((component) => component.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((component) => component.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((component) => component.Marker), { ssr: false });
const location: LatLngExpression = [-7.537995488778458, 112.60041672654343]

export default function Map() {

  return (
    <div className='w-full aspect-square relative rounded-3xl overflow-hidden shrink-0'>
      <MapContainer zoomControl center={location} zoom={13} scrollWheelZoom={false} className='aspect-square w-full h-full z-10'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {window && <Marker position={location} icon={L.icon({ iconUrl: `images/marker-icon.png`, iconSize: [24, 24] })}>
          <Popup>
            Jl. Utara Masjid Sirno, Desa Purwojati, Kec. Ngoro, Kab. Mojokerto
          </Popup>
        </Marker>}
      </MapContainer>
    </div>
  )
}