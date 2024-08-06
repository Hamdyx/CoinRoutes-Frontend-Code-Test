type Params = {
  data: any;
  setPairAsks: (pairAsks: string[][] | null) => void;
  setPairBids: (pairBids: string[][] | null) => void;
};

export const handleSnapshotMessage = ({ data, setPairAsks, setPairBids }: Params) => {
  const { asks, bids } = data;
  setPairAsks(asks);
  setPairBids(bids);
};
