import { useApi } from "./api";

function App() {
  const { data, isLoading } = useApi({
    method: "search.map",
    params: {
      filter: {
        // onlyAvailable: false,
        // models: ["Corsa"],
        // fuelType: "benzine",
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

  return isLoading ? <>Loading...</> : <>{JSON.stringify(data)}</>;
}

export default App
