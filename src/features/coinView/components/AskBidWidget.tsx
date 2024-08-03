import { Flex } from 'antd';
import AskBidCard from './AskBidCard';

function AskBidWidget() {
  return (
    <Flex gap={8}>
      <AskBidCard
        cardTitle="Best Bid"
        price={1234.5678}
        priceTitle="Bid Price"
        quantity={0.01234}
        quantityTitle="Bid Quantity"
      />

      <AskBidCard
        cardTitle="Best Ask"
        price={1234.5678}
        priceTitle="Ask Price"
        quantity={0.01234}
        quantityTitle="Ask Quantity"
        background="red"
      />
    </Flex>
  );
}

export default AskBidWidget;
