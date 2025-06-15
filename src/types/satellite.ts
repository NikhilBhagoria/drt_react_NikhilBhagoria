export interface Satellite {
    noradCatId: string;
    intlDes: string;
    name: string;
    launchDate: string;
    decayDate: string | null;
    objectType: 'PAYLOAD' | 'ROCKET BODY' | 'DEBRIS' | 'UNKNOWN';
    launchSiteCode: string;
    countryCode: string;
    orbitCode: string;
  }
  
  export interface SatelliteResponse {
    data: Satellite[];
    counts: {
      total: string;
      PAYLOAD: string;
      'ROCKET BODY': string;
      UNKNOWN: string;
      DEBRIS: string;
    };
  }
  
  export interface FilterState {
    objectTypes: string[];
    orbitCodes: string[];
    searchTerm: string;
    noradCatId: string;
  }
  
  export const OBJECT_TYPES = ['PAYLOAD', 'ROCKET BODY', 'DEBRIS', 'UNKNOWN'];
  export const ORBIT_CODES = [
    'LEO', 'LEO1', 'LEO2', 'LEO3', 'LEO4', 'MEO', 'GEO', 'HEO', 
    'IGO', 'EGO', 'NSO', 'GTO', 'GHO', 'HAO', 'MGO', 'LMO', 
    'UFO', 'ESO', 'UNKNOWN'
  ];