'use client';

import { useState } from 'react';

interface ResourceFilterProps {
  onFilterChange: (filters: FilterState) => void;
  allModels: string[];
}

interface FilterState {
  queryModels: string[];
  fuelType: string;
  availability: boolean;
  towbar: boolean;
  winterTires: boolean;
}

export default function ResourceFilter({
  onFilterChange,
  allModels,
}: ResourceFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    queryModels: [],
    fuelType: '',
    availability: false,
    towbar: false,
    winterTires: false,
  });

  const handleModelToggle = (model: string) => {
    const newModels = filters.queryModels.includes(model)
      ? filters.queryModels.filter((m) => m !== model)
      : [...filters.queryModels, model];

    const newFilters = { ...filters, queryModels: newModels };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFuelTypeChange = (value: string) => {
    const newFilters = { ...filters, fuelType: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (
    key: 'availability' | 'towbar' | 'winterTires',
    value: boolean
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const newFilters: FilterState = {
      queryModels: [],
      fuelType: '',
      availability: false,
      towbar: false,
      winterTires: false,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <fieldset className="border border-green-200 rounded-2xl p-4 bg-green-50 shadow-md max-w-md w-full">
      <legend className="text-xl font-bold text-green-800">
        Filter auto&apos;s
      </legend>

      {allModels.length > 0 && (
        <div className="mb-4">
          <p className="font-medium text-green-700 mb-2">Filter op model:</p>
          <div className="flex flex-wrap gap-2">
            {allModels.map(
              (model) =>
                model && (
                  <button
                    key={model}
                    type="button"
                    onClick={() => handleModelToggle(model)}
                    className={`px-3 py-1 rounded-full border transition-colors duration-200 ${
                      filters.queryModels.includes(model)
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-green-800 border-green-300 hover:bg-green-100'
                    }`}
                  >
                    {model}
                  </button>
                )
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              const newFilters = { ...filters, queryModels: [] };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
            className="mt-2 px-3 py-1 text-sm text-green-700 hover:text-white hover:bg-green-600 rounded-full border border-green-400 transition"
          >
            Wis selectie
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="flex flex-col text-green-800 font-medium mb-2">
          Brandstoftype
          <select
            className="mt-1 p-2 border rounded-lg bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-400"
            value={filters.fuelType}
            onChange={(e) => handleFuelTypeChange(e.target.value)}
          >
            <option value="">Alle</option>
            <option value="elektrisch">Elektrisch</option>
            <option value="benzine">Benzine</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="checkbox"
            checked={filters.availability}
            onChange={(e) =>
              handleCheckboxChange('availability', e.target.checked)
            }
            className="accent-green-600"
          />
          Alleen beschikbare auto&apos;s
        </label>

        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="checkbox"
            checked={filters.towbar}
            onChange={(e) => handleCheckboxChange('towbar', e.target.checked)}
            className="accent-green-600"
          />
          Trekhaak
        </label>

        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="checkbox"
            checked={filters.winterTires}
            onChange={(e) =>
              handleCheckboxChange('winterTires', e.target.checked)
            }
            className="accent-green-600"
          />
          Winterbanden
        </label>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
      >
        Wis filters
      </button>
    </fieldset>
  );
}
