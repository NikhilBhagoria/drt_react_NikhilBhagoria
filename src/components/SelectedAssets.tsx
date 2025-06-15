import React from 'react';
import type { Satellite } from '../types/satellite';

interface SelectedAssetsProps {
  selectedItems: string[];
  allData: Satellite[];
  onRemoveItem: (noradCatId: string) => void;
  onClearAll: () => void;
  onProceed: () => void;
}

export const SelectedAssets: React.FC<SelectedAssetsProps> = ({
  selectedItems,
  allData,
  onRemoveItem,
  onClearAll,
  onProceed,
}) => {
  const selectedSatellites = allData.filter(sat => selectedItems.includes(sat.noradCatId));

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Selected Assets</h2>
        <button
          onClick={onClearAll}
          className="text-sm text-gray-400 hover:text-white"
        >
          Clear all ×
        </button>
      </div>

      <div className="text-sm text-blue-400 mb-4">
        {selectedItems.length} objects selected
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {selectedSatellites.map((satellite) => (
          <div
            key={satellite.noradCatId}
            className="flex justify-between items-center p-2 bg-gray-800 rounded"
          >
            <div>
              <div className="text-white font-medium">{satellite.name}</div>
              <div className="text-gray-400 text-sm">{satellite.noradCatId}</div>
            </div>
            <button
              onClick={() => onRemoveItem(satellite.noradCatId)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <button
          onClick={onProceed}
          className="w-full mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
        >
          PROCEED
        </button>
      )}
    </div>
  );
};