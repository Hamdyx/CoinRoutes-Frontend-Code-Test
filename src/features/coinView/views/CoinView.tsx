import { Flex } from 'antd';

import CoinsDropdown from '../components/CoinsDropdown';
import AskBidWidget from '../components/bestAskAndBid/AskBidWidget';
import LadderWidget from '../components/orderBook/LadderWidget';
import ChartWidget from '../components/ChartWidget';

function CoinView() {
  return (
    <Flex gap={8} vertical>
      <CoinsDropdown />
      <AskBidWidget />
      <Flex gap={16}>
        <ChartWidget />
        <LadderWidget />
      </Flex>
    </Flex>
  );
}

export default CoinView;
