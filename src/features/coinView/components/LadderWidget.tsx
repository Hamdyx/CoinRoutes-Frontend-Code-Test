import { Card } from 'antd';
import styled from 'styled-components';

import LadderTable from './LadderTable';

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
  return (
    <StyledCard title="Order Book">
      <LadderTable type="asks" />
      <LadderTable type="bids" showHeader={false} />
    </StyledCard>
  );
}

export default LadderWidget;
