import type { SnapshotMessage } from '@/types';

type Params = {
  data: SnapshotMessage;
  setPairAsks: (pairAsks: string[][] | null) => void;
  setPairBids: (pairBids: string[][] | null) => void;
};

export const handleSnapshotMessage = ({ data, setPairAsks, setPairBids }: Params) => {
  const { asks, bids } = data;
  setPairAsks(asks);
  setPairBids(bids);
};
