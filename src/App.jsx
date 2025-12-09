import { useState } from 'react';
import { useApi } from './api';

function App() {
  const [modelQuery, setModelQuery] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [availability, setAvailability] = useState(false);
  const [towbar, setTowbar] = useState(false);
  const [winterTires, setWinterTires] = useState(false);

  const { data, isLoading } = useApi({
    method: 'search.map',
    params: {
      filter: {
        onlyAvailable: availability || undefined,
        models: modelQuery ? [modelQuery] : undefined,
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

  const result = data?.result || [];

  return (
    <div>
      <fieldset>
        <legend>Filter auto's</legend>

        <div>
          <label>
            Zoek op model
            <input
              type="text"
              value={modelQuery}
              onChange={(e) => setModelQuery(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Brandstoftype
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Alle</option>
              <option value="elektrisch">Elektrisch</option>
              <option value="benzine">Benzine</option>
            </select>
          </label>
        </div>

        <label>
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
          Alleen beschikbare auto's
        </label>

        <label>
          <input
            type="checkbox"
            checked={towbar}
            onChange={(e) => setTowbar(e.target.checked)}
          />
          Trekhaak
        </label>

        <label>
          <input
            type="checkbox"
            checked={winterTires}
            onChange={(e) => setWinterTires(e.target.checked)}
          />
          Winterbanden
        </label>
      </fieldset>

      {isLoading && <p>Resultaten aan het laden...</p>}

      {!isLoading && !result.total && <p>Geen resultaten gevonden.</p>}

      {!isLoading && result.total > 0 && (
        <>
          <p>
            {result.total} auto{result.total !== 1 ? "'s" : ''} gevonden
          </p>

          {result.results?.map((item, index) => {
            const resource = item.resource || {};
            const availability = item.availability ?? 'Unknown';

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

export default App;
