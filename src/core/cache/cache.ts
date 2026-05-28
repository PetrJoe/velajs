const store = new Map<string, { value: unknown; expiresAt?: number }>();

export function cacheSet<T>(key: string, value: T, ttlMs?: number) {
  store.set(key, { value, expiresAt: ttlMs ? Date.now() + ttlMs : undefined });
}

export function cacheGet<T>(key: string): T | undefined {
  const item = store.get(key);
  if (!item) return undefined;
  if (item.expiresAt && item.expiresAt < Date.now()) {
    store.delete(key);
    return undefined;
  }
  return item.value as T;
}
