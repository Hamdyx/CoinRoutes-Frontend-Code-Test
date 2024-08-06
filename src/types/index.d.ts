export interface TableOrder {
  key: number;
  market_size: number;
  price: number;
  my_size: number;
  percentage: number;
}
export interface Ticker {
  best_ask: string | number;
  best_ask_size: string | number;
  best_bid: string | number;
  best_bid_size: string | number;
  high_24h: string | number;
  last_size: string | number;
  low_24h: string | number;
  open_24h: string | number;
  price: string | number;
  product_id: string;
  sequence: number;
  side: 'sell' | 'buy';
  time: string;
  trade_id: number;
  type: 'ticker';
  volume_24h: string;
  volume_30d: string;
}

export interface ChartData {
  name: string;
  asks: number;
  bids: number;
}

export type Order = [string, string];

export interface SnapshotMessage {
  type: 'snapshot';
  product_id: string;
  asks: Order[];
  bids: Order[];
}

export interface L2UpdateMessage {
  type: 'l2update';
  product_id: string;
  changes: [string, string, string][];
}

export type WebSocketData = TickerMessage | SnapshotMessage | L2UpdateMessage;

interface AggregatedOrders {
  orders: Order[];
  totalSize: number;
}
interface OrdersSize {
  asks: number;
  bids: number;
}
