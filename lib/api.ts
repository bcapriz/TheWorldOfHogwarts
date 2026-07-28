import { z } from 'zod';
import { HouseSchema, type House } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_WIZARD_API_URL;

export class HouseNotFoundError extends Error {
    constructor(id: string) {
        super(`House not found: ${id}`);
        this.name = 'HouseNotFoundError';
    }
}

export class HouseValidationError extends Error {
    constructor(context: string, cause: z.ZodError) {
        super(`Unexpected response shape from Wizard World API (${context})`, { cause });
        this.name = 'HouseValidationError';
    }
}

export async function getHouses(): Promise<House[]> {
    const res = await fetch(`${BASE_URL}/houses`, {
        next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch houses: ${res.status}`);

    const result = z.array(HouseSchema).safeParse(await res.json());
    if (!result.success) throw new HouseValidationError('getHouses', result.error);
    return result.data;
}

export async function getHouseById(id: string): Promise<House> {
    const res = await fetch(`${BASE_URL}/houses/${encodeURIComponent(id)}`, {
        next: { revalidate: 86400 },
    });

    if (res.status === 400) {
        throw new HouseNotFoundError(id);
    }
    if (!res.ok) {
        throw new Error(`Failed to fetch house ${id}: ${res.status}`);
    }

    const result = HouseSchema.safeParse(await res.json());
    if (!result.success) throw new HouseValidationError(`getHouseById(${id})`, result.error);
    return result.data;
}