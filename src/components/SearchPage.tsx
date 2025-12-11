'use client';

import { useEffect, useMemo, useState } from 'react';
import { MdGridView, MdList, MdMap } from 'react-icons/md';
import { useStore } from '@/lib/store';
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

export default function SearchPage() {
  const [availability, setAvailability] = useState(false);
  const [queryModels, setQueryModels] = useState<string[]>([]);
  const [fuelType, setFuelType] = useState('');
  const [towbar, setTowbar] = useState(false);
  const [winterTires, setWinterTires] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const { allModels, setAllModels } = useStore();

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

  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedFilter(filter), 250);
    return () => clearTimeout(id);
  }, [filter]);

  const { data, isLoading, error } = useApi<ResponseBody<ResponseResult>>({
    method: 'search.map',
    params: {
      filter: debouncedFilter,
      locationPoint,
    },
  });

  const result = useMemo<ResponseResult>(
    () => data?.result || emptyResult,
    [data]
  );

  useEffect(() => {
    if (!data) return;

    const models =
      data.result.results
        ?.map((item: Result) => item.resource?.model)
        .filter((model): model is string => Boolean(model)) ?? [];

    if (models.length) setAllModels(models);
  }, [data, setAllModels]);

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

      <div className="flex justify-between max-w-md">
        <p className="text-xl font-semibold text-green-700">
          {result.total} auto{result.total !== 1 ? "'s" : ''} gevonden
        </p>

        <div className="flex gap-4 text-green-800">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowMap(!showMap)}
          >
            <MdMap size={24} />
          </button>
          <button
            type="button"
            onClick={() => setIsGridView(!isGridView)}
            className="cursor-pointer"
          >
            {isGridView ? <MdList size={24} /> : <MdGridView size={24} />}
          </button>
        </div>
      </div>

      {showMap && <Map locationPoint={locationPoint} result={result.results} />}

      <Resources
        result={result}
        isLoading={isLoading}
        error={error}
        isGridView={isGridView}
      />
    </>
  );
}
