export const isEmptyValue = (value?: string | number | boolean | null) => {
  return value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0);
};
