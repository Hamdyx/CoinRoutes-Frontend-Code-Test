import { Divider, Flex, Skeleton, Typography } from 'antd';

import { formatNumber } from '@/utils/formatNumbers';
import StyledCard from '@/components/shared/StyledCard';

const { Title, Text } = Typography;

type Props = {
  cardTitle: string;
  price: string | number | undefined;
  priceTitle: string;
  quantity: string | number | undefined;
  quantityTitle: string;
  background?: 'green' | 'red';
};

function AskBidCard({ cardTitle, price, priceTitle, quantity, quantityTitle, background = 'green' }: Props) {
  return (
    <StyledCard title={cardTitle} background={background}>
      <Flex justify="space-between" gap={8}>
        <Flex vertical flex={1}>
          {price === undefined ? <Skeleton.Input /> : <Title level={4}>{formatNumber(price)}</Title>}
          <Text>{priceTitle}</Text>
        </Flex>
        <Divider
          type="vertical"
          style={{
            height: 'auto',
          }}
        />
        <Flex vertical flex={1}>
          {quantity === undefined ? (
            <Skeleton.Input />
          ) : (
            <Title level={4}>
              {formatNumber(quantity, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })}
            </Title>
          )}
          <Text>{quantityTitle}</Text>
        </Flex>
      </Flex>
    </StyledCard>
  );
}

export default AskBidCard;
