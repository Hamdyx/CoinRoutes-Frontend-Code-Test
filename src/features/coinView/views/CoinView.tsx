import { Flex, Grid } from 'antd';

import CoinsDropdown from '../components/CoinsDropdown';
import AskBidWidget from '../components/bestAskAndBid/AskBidWidget';
import LadderWidget from '../components/orderBook/LadderWidget';
import ChartWidget from '../components/ChartWidget';

const { useBreakpoint } = Grid;

function CoinView() {
  const screens = useBreakpoint();
  return (
    <Flex gap={8} vertical>
      <CoinsDropdown />
      <AskBidWidget />
      <Flex gap={16} vertical={!screens.md}>
        <ChartWidget />
        <LadderWidget />
      </Flex>
    </Flex>
  );
}

export default CoinView;
