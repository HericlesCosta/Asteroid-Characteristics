export interface AsteroidApi {
    designation: string;
    discovery_date: string;
    h_mag: string;
    moid_au: string;
    q_au_1: string;
    q_au_2: string;
    period_yr: string;
    i_deg: string;
    pha: 'Y' | 'N'
    orbit_class: string;
    discovery_timestamp: number;
}

export interface AsteroidApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: AsteroidApi[];
}

export interface Asteroid {
    designation: string;
    discovery_date: string;
    magnitude: number;
    missDistanceAu: number;
    orbitalPeriodYears: number;
    inclinationDegrees: number;
    potentiallyHazardous: boolean;
    orbitClass: string;
}