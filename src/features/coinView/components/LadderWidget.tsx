import { Card, Typography } from 'antd';
import styled from 'styled-components';

import { useCoinPairStore } from '@/stores/coinPair';

import LadderTable from './LadderTable';
import { StyledTextContainer } from './StyledTextContainer';

const { Text } = Typography;

const StyledCard = styled(Card)`
  &.ant-card {
    width: 400px;
    background: #434343;
    border-color: #595959;
    & > .ant-card-head {
      text-align: start;
      color: white;
    }
  }
`;

function LadderWidget() {
  const { pairAsks, pairBids } = useCoinPairStore();

  return (
    <StyledCard title="Order Book">
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
