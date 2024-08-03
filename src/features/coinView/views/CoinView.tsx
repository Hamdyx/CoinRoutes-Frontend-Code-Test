import { Flex } from 'antd';

import CoinsDropdown from '../components/CoinsDropdown';
import AskBidWidget from '../components/AskBidWidget';

function CoinView() {
  return (
    <Flex gap={8} vertical>
      <CoinsDropdown />
      <AskBidWidget />
    </Flex>
  );
}

export default CoinView;
