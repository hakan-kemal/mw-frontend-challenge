'use client';

import { useState, useMemo } from 'react';
import { useApi } from '@/lib/api';
import type { ResponseBody, ResponseResult, Result } from '@/types';
import ResourceFilter from '@/components/ResourceFilter';
import Resources from '@/components/Resources';
import Map from '@/components/Map';

const emptyResult: ResponseResult = {
  results: [],
  current: 0,
  offset: 0,
  limit: 0,
  total: 0,
  riskyNightTrip: {
    minimumTrips: 0,
    startTime: { hour: '0', minute: '0', second: '0' },
    endTime: { hour: '0', minute: '0', second: '0' },
  },
};

export default function Home() {
  const [availability, setAvailability] = useState(false);
  const [queryModels, setQueryModels] = useState<string[]>([]);
  const [fuelType, setFuelType] = useState('');
  const [towbar, setTowbar] = useState(false);
  const [winterTires, setWinterTires] = useState(false);

  const { filter, locationPoint } = useMemo(
    () => ({
      filter: {
        onlyAvailable: availability || undefined,
        models: queryModels.length > 0 ? queryModels : undefined,
        fuelType: fuelType || undefined,
        towbar: towbar || undefined,
        winterTires: winterTires || undefined,
      },
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    }),
    [availability, queryModels, fuelType, towbar, winterTires]
  );

  const { data, isLoading, error } = useApi<ResponseBody<ResponseResult>>({
    method: 'search.map',
    params: {
      filter,
      locationPoint,
    },
  });

  const result = useMemo<ResponseResult>(
    () => data?.result || emptyResult,
    [data]
  );

  const allModels = useMemo<string[]>(() => {
    if (!data?.result?.results?.length) return [];

    return Array.from(
      new Set(
        data.result.results
          .map((item: Result) => item.resource?.model)
          .filter((model): model is string => Boolean(model))
      )
    );
  }, [data]);

  return (
    <>
      <ResourceFilter
        onFilterChange={({
          queryModels,
          fuelType,
          availability,
          towbar,
          winterTires,
        }) => {
          setQueryModels(queryModels);
          setFuelType(fuelType);
          setAvailability(availability);
          setTowbar(towbar);
          setWinterTires(winterTires);
        }}
        allModels={allModels}
      />

      <Map locationPoint={locationPoint} result={result.results} />

      <Resources result={result} isLoading={isLoading} error={error} />
    </>
  );
}
