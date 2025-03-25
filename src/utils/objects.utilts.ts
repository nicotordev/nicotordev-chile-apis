function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    const keyWithType = key as string;
    if (
      Object.prototype.hasOwnProperty.call(obj, keyWithType) &&
      obj[`${keyWithType}`] !== undefined
    ) {
      Object.defineProperty(newObj, keyWithType, {
        value: obj[`${keyWithType}`],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }
  return newObj;
}

export { stripUndefined };
