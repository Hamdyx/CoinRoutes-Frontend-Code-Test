import { Typography } from 'antd';

import { useCoinPairStore } from '@/stores/coinPair';
import StyledCard from '@/components/shared/StyledCard';
import { StyledTextContainer } from '@/components/shared/StyledTextContainer';
import { StyledInputNumber } from '@/lib/theme/components/InputNumber';

import LadderTable from './LadderTable';

const { Text } = Typography;

function LadderWidget() {
  const { aggregation, setAggregation, aggregatedAsks, aggregatedrBids } = useCoinPairStore();

  const handleAggregationChange = (value: number | string | null) => {
    setAggregation(value === null ? 0.01 : +value);
  };

  return (
    <StyledCard title="Order Book" variant="secondary">
      <LadderTable type="asks" dataArr={aggregatedAsks} />
      <StyledTextContainer gap={32}>
        <Text>USD Spread</Text>
        <Text>{aggregation}</Text>
      </StyledTextContainer>
      <LadderTable type="bids" dataArr={aggregatedrBids} showHeader={false} />
      <StyledTextContainer gap={32} align="center">
        <Text>Aggregation</Text>
        <StyledInputNumber
          min={0.01}
          max={100}
          defaultValue={aggregation}
          onChange={handleAggregationChange}
          step={0.01}
          variant="outlined"
        />
      </StyledTextContainer>
    </StyledCard>
  );
}

export default LadderWidget;
