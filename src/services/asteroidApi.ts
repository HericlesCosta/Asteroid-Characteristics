import type { AsteroidApiResponse } from "../types/asteroid";

const API_URL = 'https://jsonmock.hackerrank.com/api/asteroids';

export async function fetchAsteroids(page: number = 1): Promise<AsteroidApiResponse> {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
        throw new Error(`Error fetching asteroids: ${response.statusText}`);
    }
    return response.json();
}