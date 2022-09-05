import NodeCache from "node-cache";

export class MyCache<T> {
  private cache: NodeCache;
  // TODO: implement a lock system on the cache to allow for atomic get-set operations.

  // private lockCache: NodeCache;

  constructor(ttl?: number, checkperiod?: number) {
    const defaultTtl = 0;
    const defaultCheckperiod = 0;
    this.cache = new NodeCache({ stdTTL: ttl || defaultTtl, checkperiod: checkperiod || defaultCheckperiod });
    // this.lockCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
  }

  get(key: NodeCache.Key): T | undefined {
    return this.cache.get(key);
  }

  set(key: NodeCache.Key, value: T): boolean {
    return this.cache.set(key, value);
  }

  has(key: NodeCache.Key): boolean {
    return this.cache.has(key);
  }
}