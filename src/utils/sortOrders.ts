import { Order } from '@/types';

export const sortOrders = (orders: Order[], type: 'sell' | 'buy'): Order[] => {
  return orders.sort((a, b) =>
    type === 'sell' ? parseFloat(a[0]) - parseFloat(b[0]) : parseFloat(b[0]) - parseFloat(a[0]),
  );
};
