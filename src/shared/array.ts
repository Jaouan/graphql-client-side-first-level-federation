/**
 * Groups an array of objects by a key field.
 * @param array The array to group.
 * @param keyField The field to group by.
 * @returns A record grouped by the key field.
 */
export const groupBy = <T>(
  array: T[],
  keyField: keyof T
): Record<string, T[]> =>
  array.reduce((store: Record<string, T[]>, item: T) => {
    const key = item[keyField] as unknown as string;
    store[key] = store[key] ?? [];
    store[key].push(item);
    return store;
  }, {});
