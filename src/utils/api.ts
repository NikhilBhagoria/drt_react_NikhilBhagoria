import type { SatelliteResponse, FilterState } from '../types/satellite';

const API_BASE_URL = 'https://backend.digantara.dev/v1';

export const fetchSatellites = async (filters: FilterState): Promise<SatelliteResponse> => {
  const params = new URLSearchParams();
  
  // Add object types filter
  if (filters.objectTypes.length > 0) {
    params.append('objectTypes', filters.objectTypes.join(','));
  }
  
  // Always include all required attributes
  params.append('attributes', 'noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode');
  
  const url = `${API_BASE_URL}/satellites?${params.toString()}`;
  
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};