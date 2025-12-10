'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ResponseResult } from '@/types';

interface ResourcesProps {
  result: ResponseResult;
  isLoading: boolean;
}

export default function Resources({ result, isLoading }: ResourcesProps) {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => setIsGridView(!isGridView);

  if (isLoading) {
    return (
      <p className="text-xl font-semibold text-green-700 animate-pulse">
        Resultaten aan het laden...
      </p>
    );
  }

  if (!result.total) {
    return (
      <p className="text-xl font-semibold text-green-700">
        Geen resultaten gevonden.
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-between max-w-md">
        <p className="text-xl font-semibold text-green-700">
          {result.total} auto{result.total !== 1 ? "'s" : ''} gevonden
        </p>
        <button
          type="button"
          className="px-3 py-1 rounded-full border transition-colors duration-200 bg-white text-green-800 border-green-300 hover:bg-green-100 cursor-pointer w-24"
          onClick={toggleView}
        >
          {isGridView ? 'Lijst' : 'Raster'}
        </button>
      </div>

      <div
        className={`grid ${
          isGridView ? 'grid-cols-4' : 'grid-cols-1'
        } gap-8 mt-8`}
      >
        {result.results?.map((item, index) => {
          const resource = item.resource || null;
          const availability = item.availability ?? 'Unknown';

          return (
            resource && (
              <div
                key={resource.id || index}
                className="w-full max-w-xs p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-200"
              >
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  {resource.brand} {resource.model}
                </h2>

                <ul className="text-sm text-gray-700 space-y-1 mb-2">
                  <li>
                    📍 {resource.location} {resource.streetNumber},{' '}
                    {resource.city}
                  </li>
                  <li>⛽ {resource.fuelType}</li>
                  <li>📅 {availability}</li>
                  <li>💶 €{resource.price.hourRate}/uur</li>
                </ul>

                {resource.imageUrl && (
                  <Image
                    src={resource.imageUrl}
                    alt={`${resource.brand} ${resource.model}`}
                    loading="lazy"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
