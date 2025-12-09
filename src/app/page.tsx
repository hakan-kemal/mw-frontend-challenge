'use client';

import { useEffect, useState, useMemo } from 'react';
import { useApi } from '@/lib/api';
import type { ResponseResult, Result } from '@/types';
import ResourceFilter from '@/components/ResourceFilter';
import Resources from '@/components/Resources';

export default function Home() {
  const [allModels, setAllModels] = useState<string[]>([]);
  const [availability, setAvailability] = useState(false);
  const [queryModels, setQueryModels] = useState<string[]>([]);
  const [fuelType, setFuelType] = useState('');
  const [towbar, setTowbar] = useState(false);
  const [winterTires, setWinterTires] = useState(false);

  const { data, isLoading } = useApi({
    method: 'search.map',
    params: {
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
    },
  });

  const result = useMemo<ResponseResult>(() => data?.result || {}, [data]);

  useEffect(() => {
    if (data?.result?.results?.length && allModels.length === 0) {
      const models: string[] = Array.from(
        new Set(
          data.result.results
            .map((item: Result) => item.resource?.model)
            .filter(Boolean)
        )
      );
      setAllModels(models);
    }
  }, [data, allModels.length]);

  return (
    <div>
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

      <Resources result={result} isLoading={isLoading} />
    </div>
  );
}
