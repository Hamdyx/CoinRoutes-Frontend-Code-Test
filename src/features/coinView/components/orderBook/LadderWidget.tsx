import { Typography } from 'antd';

import { useCoinPairStore } from '@/stores/coinPair';
import StyledCard from '@/components/shared/StyledCard';
import { StyledTextContainer } from '@/components/shared/StyledTextContainer';

import LadderTable from './LadderTable';

const { Text } = Typography;

function LadderWidget() {
  const { pairAsks, pairBids } = useCoinPairStore();

  return (
    <StyledCard title="Order Book" variant="secondary">
      <LadderTable type="asks" dataArr={pairAsks} />
      <StyledTextContainer gap={32}>
        <Text>USD Spread</Text>
        <Text>0.01</Text>
      </StyledTextContainer>
      <LadderTable type="bids" dataArr={pairBids} showHeader={false} />
      <StyledTextContainer gap={32}>
        <Text>Aggregation</Text>
        <Text>0.01</Text>
      </StyledTextContainer>
    </StyledCard>
  );
}

export default LadderWidget;
