import React, { useState, useMemo } from 'react';
import { AutoSizer, SortDirection } from 'react-virtualized';
import type { Satellite } from '../types/satellite';
import 'react-virtualized/styles.css';

interface SatelliteTableProps {
  data: Satellite[];
  selectedItems: string[];
  onSelectionChange: (noradCatId: string) => void;
  onSelectAll: () => void;
  maxSelections?: number;
}

export const SatelliteTable: React.FC<SatelliteTableProps> = ({
  data,
  selectedItems,
  onSelectionChange,
  onSelectAll,
  maxSelections = 10,
}) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      let aValue = a[sortBy as keyof Satellite];
      let bValue = b[sortBy as keyof Satellite];

      if (sortBy === 'launchDate') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortDirection === 'ASC' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'ASC' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortBy, sortDirection]);

  const handleSort = ({ sortBy: newSortBy }: { sortBy: string }) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(newSortBy);
      setSortDirection('ASC');
    }
  };

  const handleItemSelection = (noradCatId: string) => {
    if (selectedItems.includes(noradCatId)) {
      onSelectionChange(noradCatId);
    } else if (selectedItems.length < maxSelections) {
      onSelectionChange(noradCatId);
    }
  };

  const rowRenderer = ({ index, key, style }: any) => {
    const item = sortedData[index];
    const isSelected = selectedItems.includes(item.noradCatId);
    const canSelect = selectedItems.length < maxSelections || isSelected;

    return (
      <div
        key={key}
        style={style}
        className={`flex items-center px-4 border-b border-gray-700 ${
          isSelected ? 'bg-blue-900/30' : 'hover:bg-gray-800/50'
        }`}
      >
        <div className="w-12 flex justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleItemSelection(item.noradCatId)}
            disabled={!canSelect}
            className="text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 grid grid-cols-6 gap-4 py-3 text-sm">
          <div className="text-white font-medium">{item.name}</div>
          <div className="text-gray-300">{item.noradCatId}</div>
          <div className="text-gray-300">{item.orbitCode}</div>
          <div className="text-gray-300">{item.objectType}</div>
          <div className="text-gray-300">{item.countryCode}</div>
          <div className="text-gray-300">{item.launchDate}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="w-12 flex justify-center">
          <input
            type="checkbox"
            onChange={onSelectAll}
            className="text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium text-gray-300">
          <button
            onClick={() => handleSort({ sortBy: 'name' })}
            className="text-left hover:text-white"
          >
            Name {sortBy === 'name' && (sortDirection === 'ASC' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort({ sortBy: 'noradCatId' })}
            className="text-left hover:text-white"
          >
            NORAD ID {sortBy === 'noradCatId' && (sortDirection === 'ASC' ? '↑' : '↓')}
          </button>
          <div>Regime</div>
          <div>Object Type</div>
          <button
            onClick={() => handleSort({ sortBy: 'countryCode' })}
            className="text-left hover:text-white"
          >
            Country {sortBy === 'countryCode' && (sortDirection === 'ASC' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort({ sortBy: 'launchDate' })}
            className="text-left hover:text-white"
          >
            Launch Date {sortBy === 'launchDate' && (sortDirection === 'ASC' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Virtualized List */}
      <div style={{ height: '600px' }}>
        <AutoSizer>
          {({ height, width }) => (
            <div style={{ height, overflow: 'auto' }}>
              {sortedData.map((item, index) => 
                rowRenderer({ 
                  index, 
                  key: item.noradCatId, 
                  style: { 
                    height: 50, 
                    width: width - 1,
                    position: 'absolute',
                    top: index * 50,
                    left: 0
                  }
                })
              )}
            </div>
          )}
        </AutoSizer>
      </div>

      <div className="px-4 py-2 bg-gray-800 text-sm text-gray-400">
        {data.length} objects • {selectedItems.length}/{maxSelections} selected
      </div>
    </div>
  );
};