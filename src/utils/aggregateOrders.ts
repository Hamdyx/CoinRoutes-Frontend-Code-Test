import { roundPrice } from './roundPrice';

export const aggregateOrders = (orders: [string, string][], aggregator: number): [string, string][] => {
  const aggregated: { [price: string]: number } = {};

  orders.forEach(([price, size]) => {
    const roundedPrice = roundPrice(parseFloat(price), aggregator).toFixed(2);
    if (aggregated[roundedPrice]) {
      aggregated[roundedPrice] += parseFloat(size);
    } else {
      aggregated[roundedPrice] = parseFloat(size);
    }
  });

  return Object.entries(aggregated).map(([price, size]) => [price, size.toFixed(8)]);
};
