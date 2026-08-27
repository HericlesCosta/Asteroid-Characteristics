import type { Asteroid, AsteroidApi } from "../types/asteroid";

export function normalizeAsteroid(asteroid: AsteroidApi): Asteroid {
    return {
        designation: asteroid.designation,
        discovery_date: asteroid.discovery_date,
        magnitude: Number(asteroid.h_mag),
        missDistanceAu: Number(asteroid.moid_au),
        orbitalPeriodYears: Number(asteroid.period_yr),
        inclinationDegrees: Number(asteroid.i_deg),
        potentiallyHazardous: asteroid.pha === 'Y',
        orbitClass: asteroid.orbit_class
    }
}