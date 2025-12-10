export interface RequestBody {
  jsonrpc: string;
  id: number;
  method: string;
  params: Params;
}

interface Params {
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

export interface LocationPoint {
  latitudeMax: number;
  latitudeMin: number;
  longitudeMax: number;
  longitudeMin: number;
}

export interface ResponseBody<T = ResponseResult> {
  jsonrpc: string;
  authenticated: boolean;
  result: T;
  id: string;
}

export interface ResponseResult {
  results: Result[];
  current: number;
  offset: number;
  limit: number;
  total: number;
  riskyNightTrip: RiskyNightTrip;
}

export interface Result {
  resource: Resource;
  availability: boolean | null;
  shouldDischarge: boolean;
  distance: number | null;
}

export interface Resource {
  id: number;
  registrationPlate: string;
  alias: string;
  resourceType: string;
  brand?: string;
  model?: string;
  color?: string;
  fuelType?: string;
  numberOfSeats: number;
  location: string;
  streetNumber?: string;
  latitude: number;
  longitude: number;
  advertisement?: string;
  discounted: boolean;
  created: string;
  city: string;
  locktype: string;
  parkingType: string;
  fuelLevel?: number;
  fuelRange?: number;
  charging: boolean;
  chargeAdapterConnected?: boolean;
  fuelRangeDefault: number;
  chargeAdapterConnectedSince?: string;
  price: Price;
  options: Options;
  locktypes: string[];
  favorite: boolean;
  category: string;
  imageUrl?: string;
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
