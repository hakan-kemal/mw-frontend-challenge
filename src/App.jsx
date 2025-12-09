import { useApi } from './api';

function App() {
  const { data, isLoading } = useApi({
    method: 'search.map',
    params: {
      filter: {
        // onlyAvailable: false,
        // models: ['Corsa'],
        // fuelType: 'benzine',
        // towbar: true,
        // winterTires: true,
      },
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    },
  });

  const results = data?.result?.results || [];

  if (isLoading) return <p>Loading...</p>;

  if (!results.length) return <p>No results found.</p>;

  return (
    <div>
      {results.map((item, index) => {
        const resource = item.resource || {};
        const availability = item.availability ?? 'Unknown';
        console.log('Resource:', resource);
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
    </div>
  );
}

export default App;
