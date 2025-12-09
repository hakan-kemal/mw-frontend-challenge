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
                  onClick={() => handleModelToggle(model)}
                >
                  {model}{' '}
                  {filters.queryModels.includes(model) ? '(Geselecteerd)' : ''}
                </button>
              )
          )}
        </div>
      )}

      <div>
        <button
          className="border m-1 p-1"
          type="button"
          onClick={() => {
            const newFilters = { ...filters, queryModels: [] };
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
        >
          Wis selectie
        </button>
      </div>

      <div>
        <label>
          Brandstoftype
          <select
            className="border m-1 p-1"
            value={filters.fuelType}
            onChange={(e) => handleFuelTypeChange(e.target.value)}
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
          checked={filters.availability}
          onChange={(e) =>
            handleCheckboxChange('availability', e.target.checked)
          }
        />
        Alleen beschikbare auto&apos;s
      </label>

      <label className="border m-1 p-1">
        <input
          type="checkbox"
          checked={filters.towbar}
          onChange={(e) => handleCheckboxChange('towbar', e.target.checked)}
        />
        Trekhaak
      </label>

      <label className="border m-1 p-1">
        <input
          type="checkbox"
          checked={filters.winterTires}
          onChange={(e) =>
            handleCheckboxChange('winterTires', e.target.checked)
          }
        />
        Winterbanden
      </label>

      <div>
        <label>
          <button
            className="border m-1 p-1"
            type="button"
            onClick={resetFilters}
          >
            Wis filters
          </button>
        </label>
      </div>
    </fieldset>
  );
}
