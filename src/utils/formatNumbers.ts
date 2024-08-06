import { isEmptyValue } from './isEmptyValue';

export const formatNumber = (
  number: string | number,
  options: Intl.NumberFormatOptions = { minimumFractionDigits: 0, maximumFractionDigits: 4 },
) => {
  if (isEmptyValue(number)) return -1;

  const formatted = new Intl.NumberFormat('en', {
    style: 'decimal',
    ...options,
  }).format(+number);

  return formatted;
};
