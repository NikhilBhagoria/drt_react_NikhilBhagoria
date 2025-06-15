import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSatelliteData } from '../hooks/useSatelliteData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SearchBar } from '../components/SearchBar';
import { FilterSection } from '../components/FilterSection';
import { SatelliteTable } from '../components/SatelliteTable';
import { SelectedAssets } from '../components/SelectedAssets';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, counts, filters, updateFilters } = useSatelliteData();
  const [selectedItems, setSelectedItems] = useLocalStorage<string[]>('selectedSatellites', []);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const handleSearch = (searchTerm: string, noradCatId: string) => {
    updateFilters({ searchTerm, noradCatId });
  };

  const handleApplyFilters = (objectTypes: string[], orbitCodes: string[]) => {
    updateFilters({ objectTypes, orbitCodes });
  };

  const handleSelectionChange = (noradCatId: string) => {
    setSelectionError(null);
    
    if (selectedItems.includes(noradCatId)) {
      setSelectedItems(prev => prev.filter(id => id !== noradCatId));
    } else {
      if (selectedItems.length >= 10) {
        setSelectionError('Maximum 10 selections allowed');
        return;
      }
      setSelectedItems(prev => [...prev, noradCatId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length > 0) {
      setSelectedItems([]);
    } else {
      const availableIds = data.slice(0, 10).map(item => item.noradCatId);
      setSelectedItems(availableIds);
    }
  };

  const handleRemoveItem = (noradCatId: string) => {
    setSelectedItems(prev => prev.filter(id => id !== noradCatId));
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const handleProceed = () => {
    navigate('/selected');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create My Asset List</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <SearchBar
              onSearch={handleSearch}
              searchTerm={filters.searchTerm}
              noradCatId={filters.noradCatId}
            />
            
            <FilterSection
              objectTypes={filters.objectTypes}
              orbitCodes={filters.orbitCodes}
              onApplyFilters={handleApplyFilters}
              counts={counts}
            />
            
            {selectionError && (
              <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
                {selectionError}
              </div>
            )}
            
            <SatelliteTable
              data={data}
              selectedItems={selectedItems}
              onSelectionChange={handleSelectionChange}
              onSelectAll={handleSelectAll}
            />
          </div>
          
          <div className="lg:col-span-1">
            <SelectedAssets
              selectedItems={selectedItems}
              allData={data}
              onRemoveItem={handleRemoveItem}
              onClearAll={handleClearAll}
              onProceed={handleProceed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};