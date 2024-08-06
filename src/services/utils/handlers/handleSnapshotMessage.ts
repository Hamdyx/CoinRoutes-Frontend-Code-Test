import type { Order, SnapshotMessage } from '@/types';

type Params = {
  data: SnapshotMessage;
  setPairAsks: (pairAsks: Order[] | null) => void;
  setPairBids: (pairBids: Order[] | null) => void;
};

export const handleSnapshotMessage = ({ data, setPairAsks, setPairBids }: Params) => {
  const { asks, bids } = data;
  setPairAsks(asks.slice(0, 300));
  setPairBids(bids.slice(0, 300));
};
