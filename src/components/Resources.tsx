'use client';

import Image from 'next/image';
import type { ResponseResult } from '@/types';

interface ResourcesProps {
  result: ResponseResult;
  isLoading: boolean;
}

export default function Resources({ result, isLoading }: ResourcesProps) {
  if (isLoading) {
    return <p>Resultaten aan het laden...</p>;
  }

  if (!result.total) {
    return <p>Geen resultaten gevonden.</p>;
  }

  return (
    <>
      <p>
        {result.total} auto{result.total !== 1 ? "'s" : ''} gevonden
      </p>

      {result.results?.map((item, index) => {
        const resource = item.resource || null;
        const availability = item.availability ?? 'Unknown';

        if (resource) {
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
                <Image
                  loading="lazy"
                  src={resource.imageUrl}
                  alt={`${resource.brand} ${resource.model}`}
                  width={300}
                  height={200}
                />
              )}
            </section>
          );
        }
      })}
    </>
  );
}
