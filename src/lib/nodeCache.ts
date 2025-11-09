'use server';

import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export default async function getCache(): Promise<NodeCache> {
    return cache;
}

export async function getCacheValue<T>(key: string): Promise<T | undefined> {
    return cache.get<T>(key);
}

export async function setCacheValue<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    return cache.set(key, value, ttl ?? 60 * 60 * 24);
}

export async function deleteCacheValue(key: string): Promise<number> {
    return cache.del(key);
}

export async function clearCache(): Promise<void> {
    cache.flushAll();
}

export async function getCacheKeys(): Promise<string[]> {
    return cache.keys();
}

export async function getCacheStats(): Promise<NodeCache.Stats> {
    return cache.getStats();
}

export async function hasCacheKey(key: string): Promise<boolean> {
    return cache.has(key);
}