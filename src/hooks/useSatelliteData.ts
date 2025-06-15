import { useState, useEffect, useCallback } from 'react';
import type { Satellite, SatelliteResponse, FilterState } from '../types/satellite';
import { fetchSatellites } from '../utils/api';
import debounce from 'lodash.debounce';

export const useSatelliteData = () => {
  const [data, setData] = useState<Satellite[]>([]);
  const [filteredData, setFilteredData] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<SatelliteResponse['counts'] | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    objectTypes: [],
    orbitCodes: [],
    searchTerm: '',
    noradCatId: '',
  });

  const loadData = useCallback(async (currentFilters: FilterState) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchSatellites(currentFilters);
      setData(response.data);
      setCounts(response.counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchFilters: FilterState) => {
      loadData(searchFilters);
    }, 300),
    [loadData]
  );

  // Apply client-side filtering
  useEffect(() => {
    let filtered = [...data];

    // Filter by orbit codes
    if (filters.orbitCodes.length > 0) {
      filtered = filtered.filter(satellite => 
        filters.orbitCodes.some(code => 
          satellite.orbitCode.includes(code)
        )
      );
    }

    // Filter by search term (name)
    if (filters.searchTerm.trim()) {
      filtered = filtered.filter(satellite =>
        satellite.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by NORAD Cat ID
    if (filters.noradCatId.trim()) {
      filtered = filtered.filter(satellite =>
        satellite.noradCatId.includes(filters.noradCatId)
      );
    }

    setFilteredData(filtered);
  }, [data, filters.orbitCodes, filters.searchTerm, filters.noradCatId]);

  // Initial load and object type changes trigger API call
  useEffect(() => {
    loadData(filters);
  }, [filters.objectTypes, loadData]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    data: filteredData,
    loading,
    error,
    counts,
    filters,
    updateFilters,
    refetch: () => loadData(filters),
  };
};