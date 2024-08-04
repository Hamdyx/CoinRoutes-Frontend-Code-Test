export const orderColumns = [
  {
    title: 'Market Size',
    dataIndex: 'market_size',
    key: 'market_size',
  },
  {
    title: 'Price (USD)',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'My Size',
    dataIndex: 'my_size',
    key: 'my_size',
  },
];

export const buyOrders = Array(10)
  .fill(0)
  .map((_, i) => ({
    key: i,
    market_size: 100 * (i + 1),
    price: 1 + i,
    my_size: i,
    percentage: i,
  }));
