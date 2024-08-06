import { Flex, Grid } from 'antd';
import { useCoinPairStore } from '@/stores/coinPair';

import AskBidCard from './AskBidCard';

const { useBreakpoint } = Grid;

function AskBidWidget() {
  const screens = useBreakpoint();
  const { pairTicker } = useCoinPairStore();

  return (
    <Flex gap={8} vertical={!screens.sm}>
      <AskBidCard
        cardTitle="Best Bid"
        price={pairTicker?.best_bid}
        priceTitle="Bid Price"
        quantity={pairTicker?.best_bid_size}
        quantityTitle="Bid Quantity"
      />

      <AskBidCard
        cardTitle="Best Ask"
        price={pairTicker?.best_ask}
        priceTitle="Ask Price"
        quantity={pairTicker?.best_ask_size}
        quantityTitle="Ask Quantity"
        background="red"
      />
    </Flex>
  );
}

export default AskBidWidget;
