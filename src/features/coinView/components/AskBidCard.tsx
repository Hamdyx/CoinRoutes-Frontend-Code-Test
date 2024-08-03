import { Card, Divider, Flex, Typography } from 'antd';
import styled from 'styled-components';

import themeToken from '@lib/theme/tokens';

const { Title, Text } = Typography;

const StyledCard = styled(Card)<{ background: 'green' | 'red' }>`
  &.ant-card {
    width: 300px;
    & > .ant-card-head {
      text-align: start;
      background-color: ${(props) => themeToken[props.background]};
      color: white;
    }
  }
`;

type Props = {
  cardTitle: string;
  price: number;
  priceTitle: string;
  quantity: number;
  quantityTitle: string;
  background?: 'green' | 'red';
};

function AskBidCard({ cardTitle, price, priceTitle, quantity, quantityTitle, background = 'green' }: Props) {
  return (
    <StyledCard title={cardTitle} background={background}>
      <Flex justify="space-between">
        <Flex vertical>
          <Title level={4}>{price}</Title>
          <Text>{priceTitle}</Text>
        </Flex>
        <Divider
          type="vertical"
          style={{
            height: 'auto',
          }}
        />
        <Flex vertical>
          <Title level={4}>{quantity}</Title>
          <Text>{quantityTitle}</Text>
        </Flex>
      </Flex>
    </StyledCard>
  );
}

export default AskBidCard;
