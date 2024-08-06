import { Flex } from 'antd';
import AskBidCard from './AskBidCard';
import { useCoinPairStore } from '@/stores/coinPair';

function AskBidWidget() {
  const { pairTicker } = useCoinPairStore();

  return (
    <Flex gap={8}>
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
