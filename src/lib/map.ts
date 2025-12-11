import mapboxgl from 'mapbox-gl';
import type { Result } from '@/types';

export const buildMarkersAndBounds = (
  map: mapboxgl.Map,
  results: Result[]
): { markers: mapboxgl.Marker[]; bounds: mapboxgl.LngLatBounds } => {
  const markers: mapboxgl.Marker[] = [];
  const bounds = new mapboxgl.LngLatBounds();

  results.forEach((item) => {
    const { longitude, latitude } = item.resource;
    const hasCoords =
      typeof longitude === 'number' && typeof latitude === 'number';

    if (!hasCoords) return;

    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);
    marker.addTo(map);
    markers.push(marker);
    bounds.extend([longitude, latitude]);
  });

  return { markers, bounds };
};
