import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, noradCatId: string) => void;
  searchTerm: string;
  noradCatId: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm, noradCatId }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localNoradCatId, setLocalNoradCatId] = useState(noradCatId);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(localSearchTerm, localNoradCatId);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by Name/ NORAD ID"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="NORAD Cat ID"
          value={localNoradCatId}
          onChange={(e) => setLocalNoradCatId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};