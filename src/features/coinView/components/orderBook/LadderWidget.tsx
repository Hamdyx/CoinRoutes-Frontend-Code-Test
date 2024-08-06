import { Typography } from 'antd';

import { useCoinPairStore } from '@/stores/coinPair';
import StyledCard from '@/components/shared/StyledCard';
import { StyledTextContainer } from '@/components/shared/StyledTextContainer';
import { StyledInputNumber } from '@/lib/theme/components/InputNumber';

import LadderTable from './LadderTable';

const { Text } = Typography;

function LadderWidget() {
  const { pairAsks, pairBids, aggregation, setAggregation } = useCoinPairStore();

  const handleAggregationChange = (value: number | string | null) => {
    setAggregation(value === null ? value : +value);
  };

  return (
    <StyledCard title="Order Book" variant="secondary">
      <LadderTable type="asks" dataArr={pairAsks} />
      <StyledTextContainer gap={32}>
        <Text>USD Spread</Text>
        <Text>{aggregation ?? 0}</Text>
      </StyledTextContainer>
      <LadderTable type="bids" dataArr={pairBids} showHeader={false} />
      <StyledTextContainer gap={32}>
        <Text>Aggregation</Text>
        <StyledInputNumber
          min={0}
          max={100}
          defaultValue={aggregation ?? 0}
          onChange={handleAggregationChange}
          step={0.1}
          variant="outlined"
        />
      </StyledTextContainer>
    </StyledCard>
  );
}

export default LadderWidget;
