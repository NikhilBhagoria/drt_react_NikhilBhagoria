import React, { useState } from 'react';
import { OBJECT_TYPES, ORBIT_CODES } from '../types/satellite';
import type { SatelliteResponse } from '../types/satellite';

interface FilterSectionProps {
  objectTypes: string[];
  orbitCodes: string[];
  onApplyFilters: (objectTypes: string[], orbitCodes: string[]) => void;
  counts: SatelliteResponse['counts'] | null;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  objectTypes,
  orbitCodes,
  onApplyFilters,
  counts,
}) => {
  const [localObjectTypes, setLocalObjectTypes] = useState(objectTypes);
  const [localOrbitCodes, setLocalOrbitCodes] = useState(orbitCodes);

  const handleObjectTypeChange = (type: string) => {
    setLocalObjectTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleOrbitCodeChange = (code: string) => {
    setLocalOrbitCodes(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters(localObjectTypes, localOrbitCodes);
  };

  return (
    <div className="mb-6">
      {/* Object Type Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {OBJECT_TYPES.map(type => (
          <button
            key={type}
            onClick={() => handleObjectTypeChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              localObjectTypes.includes(type)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()} 
            {counts && counts[type as keyof typeof counts] && ` (${counts[type as keyof typeof counts]})`}
          </button>
        ))}
      </div>

      {/* Orbit Code Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Orbit Code
        </label>
        <select
          multiple
          value={localOrbitCodes}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setLocalOrbitCodes(values);
          }}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-32"
        >
          {ORBIT_CODES.map(code => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};