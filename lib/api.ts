import type { House } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_WIZARD_API_URL;


export async function getHouses(): Promise<House[]> {
    const res = await fetch(`${BASE_URL}/houses`, {
        next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch houses: ${res.status}`);
    return res.json();
}

export async function getHouseById(id: string): Promise<House> {
    const res = await fetch(`${BASE_URL}/houses/${id}`, {
        next: { revalidate: 86400 },
    });

    if (res.status === 400) {
        throw new HouseNotFoundError(id);
    }
    if (!res.ok) {
        throw new Error(`Failed to fetch house ${id}: ${res.status}`);
    }
    return res.json();
}
export class HouseNotFoundError extends Error {
    constructor(id: string) {
        super(`House not found: ${id}`);
        this.name = 'HouseNotFoundError';
    }
}