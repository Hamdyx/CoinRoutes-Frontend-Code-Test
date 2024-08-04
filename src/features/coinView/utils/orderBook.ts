export const buyOrders = Array(10)
  .fill(0)
  .map((_, i) => ({
    key: i,
    market_size: 100 * (i + 1),
    price: 1 + i,
    my_size: i,
    percentage: i,
  }));
