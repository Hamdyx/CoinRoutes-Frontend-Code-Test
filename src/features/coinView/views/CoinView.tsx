import { Flex } from 'antd';

import CoinsDropdown from '../components/CoinsDropdown';
import AskBidWidget from '../components/AskBidWidget';
import LadderWidget from '../components/LadderWidget';

function CoinView() {
  return (
    <Flex gap={8} vertical>
      <CoinsDropdown />
      <AskBidWidget />
      <LadderWidget />
    </Flex>
  );
}

export default CoinView;
