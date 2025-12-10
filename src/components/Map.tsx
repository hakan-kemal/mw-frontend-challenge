import { useRef, useEffect, useState } from 'react';
import type { LocationPoint, Result } from '@/types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  locationPoint: LocationPoint;
  result: Result[];
}

export default function Map({ locationPoint, result }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const { latitudeMin, latitudeMax, longitudeMin, longitudeMax } =
    locationPoint;

  useEffect(() => {
    if (mapContainerRef.current && !map) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

      const initializeMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
          (longitudeMin + longitudeMax) / 2,
          (latitudeMin + latitudeMax) / 2,
        ],
        zoom: 6,
      });

      setMap(initializeMap);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [
    mapContainerRef,
    map,
    latitudeMin,
    latitudeMax,
    longitudeMin,
    longitudeMax,
  ]);

  if (result && map) {
    for (const marker of result) {
      new mapboxgl.Marker()
        .setLngLat(
          marker.resource.longitude && marker.resource.latitude
            ? [marker.resource.longitude, marker.resource.latitude]
            : [0, 0]
        )
        .addTo(map);
    }
  }

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      className="w-full h-96 rounded-2xl shadow-md"
    />
  );
}
