export interface ApiRequestBody {
  jsonrpc: string;
  id: number;
  method: string;
  params: ApiRequestParams;
}

interface ApiRequestParams {
  filter: Filter;
  locationPoint: LocationPoint;
}

interface Filter {
  onlyAvailable?: boolean;
  models?: string[];
  fuelType?: string;
  towbar?: boolean;
  winterTires?: boolean;
}

interface LocationPoint {
  latitudeMax: number;
  latitudeMin: number;
  longitudeMax: number;
  longitudeMin: number;
}

export interface ResponseResult {
  results: Result[];
  current: number;
  offset: number;
  limit: number;
  total: number;
  riskyNightTrip: RiskyNightTrip;
}

interface RiskyNightTrip {
  minimumTrips: number;
  startTime: Time;
  endTime: Time;
}

interface Time {
  hour: string;
  minute: string;
  second: string;
}

export interface Result {
  resource: Vehicle | null;
  availability: boolean | null;
  shouldDischarge: boolean | null;
  distance: number | null;
}

export interface Vehicle {
  id: number;
  registrationPlate: string;
  alias: string;
  resourceType: string;
  brand: string;
  model: string;
  color: string;
  fuelType: string;
  numberOfSeats: number;
  location: string;
  streetNumber: string;
  latitude: number;
  longitude: number;
  advertisement: string | null;
  discounted: boolean;
  created: string;
  city: string;
  locktype: string;
  parkingType: string;
  fuelLevel: number;
  fuelRange: number;
  charging: boolean;
  chargeAdapterConnected: boolean | null;
  fuelRangeDefault: number;
  chargeAdapterConnectedSince: string | null;
  price: Price;
  options: Options;
  locktypes: string[];
  favorite: boolean;
  category: string;
  imageUrl: string | null;
}

interface Price {
  id: number;
  hourRate: string;
  kilometerRate: string;
  fuelPerKilometer: string;
  dayRateTotal: string;
}

interface Options {
  id: number;
  automatic: boolean;
  winterTires: boolean;
  towbar: boolean;
}
