/* eslint-disable @typescript-eslint/no-explicit-any */
type typeFn = (...args: any[]) => any;
const MAX_SIZE = 50;
export function memoize<FnType extends typeFn>(fn: FnType): FnType {
  const cache = new Map<string, ReturnType<FnType>>();
  const memo = (...args: Parameters<FnType>): ReturnType<FnType> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<FnType>;
    }
    const result = fn(...args);
    if (cache.size > MAX_SIZE) {
      cache.clear();
    }
    cache.set(key, result);
    return result;
  };
  return memo as FnType;
}

export const $nodeCache = new Map();
