import { Divider, Flex } from 'antd';

import StyledCard from '@/components/shared/StyledCard';
import NumberValueContainer from '@/components/shared/NumberValueContainer';

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
        <NumberValueContainer value={price} valueTitle={priceTitle} />
        <Divider
          type="vertical"
          style={{
            height: 'auto',
          }}
        />
        <NumberValueContainer value={quantity} valueTitle={quantityTitle} />
      </Flex>
    </StyledCard>
  );
}

export default AskBidCard;
