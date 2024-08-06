export const roundPrice = (price: number, aggregator: number): number => {
  return Math.round(price / aggregator) * aggregator;
};
