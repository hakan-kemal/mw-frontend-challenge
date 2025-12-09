'use client';

import { useEffect, useState, useMemo } from 'react';
import { useApi } from '@/lib/api';
import type { ResponseResult, Result } from '@/types';

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

  const resetFilters = () => {
    setQueryModels([]);
    setAvailability(false);
    setFuelType('');
    setTowbar(false);
    setWinterTires(false);
  };

  return (
    <div>
      <fieldset className="border m-2 p-2">
        <legend>Filter auto&apos;s</legend>

        {allModels.length > 0 && (
          <div>
            <p style={{ margin: '0' }}>Filter op</p>
            {allModels.map(
              (model) =>
                model && (
                  <button
                    className="border m-1 p-1"
                    key={model}
                    type="button"
                    onClick={() =>
                      setQueryModels((prev) =>
                        prev.includes(model)
                          ? prev.filter((m) => m !== model)
                          : [...prev, model]
                      )
                    }
                  >
                    {model}{' '}
                    {queryModels.includes(model) ? '(Geselecteerd)' : ''}
                  </button>
                )
            )}
          </div>
        )}

        <div>
          <button
            className="border m-1 p-1"
            type="button"
            onClick={() => setQueryModels([])}
          >
            Wis selectie
          </button>
        </div>

        <div>
          <label>
            Brandstoftype
            <select
              className="border m-1 p-1"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Alle</option>
              <option value="elektrisch">Elektrisch</option>
              <option value="benzine">Benzine</option>
            </select>
          </label>
        </div>

        <label className="border m-1 p-1">
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
          Alleen beschikbare auto&apos;s
        </label>

        <label className="border m-1 p-1">
          <input
            type="checkbox"
            checked={towbar}
            onChange={(e) => setTowbar(e.target.checked)}
          />
          Trekhaak
        </label>

        <label className="border m-1 p-1">
          <input
            type="checkbox"
            checked={winterTires}
            onChange={(e) => setWinterTires(e.target.checked)}
          />
          Winterbanden
        </label>

        <div>
          <label>
            <button
              className="border m-1 p-1"
              type="button"
              onClick={() => resetFilters()}
            >
              Wis filters
            </button>
          </label>
        </div>
      </fieldset>

      {isLoading && <p>Resultaten aan het laden...</p>}

      {!isLoading && !result.total && <p>Geen resultaten gevonden.</p>}

      {!isLoading && result.total > 0 && (
        <>
          <p>
            {result.total} auto{result.total !== 1 ? "'s" : ''} gevonden
          </p>

          {result.results?.map((item, index) => {
            const resource = item.resource || null;
            const availability = item.availability ?? 'Unknown';

            if (resource)
              return (
                <section key={resource.id || index}>
                  <h2>
                    {resource.brand} {resource.model}
                  </h2>

                  <ul>
                    <li>
                      Address: {resource.location} {resource.streetNumber},{' '}
                      {resource.city}
                    </li>
                    <li>Fuel type: {resource.fuelType}</li>
                    <li>Availability: {availability}</li>
                    <li>Rate: €{resource.price.hourRate}/hour</li>
                  </ul>

                  {resource.imageUrl && (
                    <img
                      src={resource.imageUrl}
                      alt={`${resource.brand} ${resource.model}`}
                      width="300"
                    />
                  )}
                </section>
              );
          })}
        </>
      )}
    </div>
  );
}
