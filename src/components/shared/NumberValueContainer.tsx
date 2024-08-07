import { Flex, Typography } from 'antd';

import { formatNumber } from '@/utils/formatNumbers';

import { CellSkeleton } from '../CellSkeleton';

const { Title, Text } = Typography;

interface Props {
  value: string | number | undefined;
  valueTitle: string;
}

function NumberValueContainer({ value, valueTitle }: Props) {
  return (
    <Flex vertical gap={8} flex={1}>
      {value === undefined ? (
        <CellSkeleton height="28px" />
      ) : (
        <Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          {formatNumber(value, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
          })}
        </Title>
      )}
      <Text>{valueTitle}</Text>
    </Flex>
  );
}

export default NumberValueContainer;
