/* eslint-disable @typescript-eslint/no-explicit-any */
type typeFn = (...args: any[]) => any;
const MAX_SIZE = 50;
export function memoize<FnType extends typeFn>(fn: FnType): FnType {
  const cache = new Map<any, ReturnType<FnType>>();
  const memo = (...args: Parameters<FnType>): ReturnType<FnType> => {
    if (cache.has(args)) {
      return cache.get(args) as ReturnType<FnType>;
    }
    const result = fn(...args);
    if (cache.size > MAX_SIZE) {
      cache.clear();
    }
    cache.set(args, result);
    return result;
  };
  return memo as FnType;
}

export const $nodeCache = new Map();
