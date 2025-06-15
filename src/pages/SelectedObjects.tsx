import React from 'react';
import { Link } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Satellite } from '../types/satellite';

export const SelectedObjects: React.FC = () => {
  const [selectedItems] = useLocalStorage<string[]>('selectedSatellites', []);
  const [allSatellites] = useLocalStorage<Satellite[]>('allSatellites', []);

  const selectedSatellites = allSatellites.filter(sat => 
    selectedItems.includes(sat.noradCatId)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Selected Objects</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Selected Satellites ({selectedSatellites.length})
          </h2>
          
          <div className="space-y-3">
            {selectedSatellites.map((satellite) => (
              <div
                key={satellite.noradCatId}
                className="flex justify-between items-center p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <div className="font-medium">{satellite.name}</div>
                  <div className="text-gray-400">NORAD ID: {satellite.noradCatId}</div>
                </div>
                <div className="text-sm text-gray-400">
                  {satellite.objectType} • {satellite.countryCode}
                </div>
              </div>
            ))}
          </div>

          {selectedSatellites.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No satellites selected. Go back to the dashboard to select some objects.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};