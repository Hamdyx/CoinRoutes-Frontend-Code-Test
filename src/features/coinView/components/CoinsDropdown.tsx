import { useEffect } from 'react';

import { StyledSelect } from '@lib/theme/components/Select';
import { useCoinPairStore } from '@/stores/coinPair';

import { coinsArr } from '../utils/coinsArr';

function CoinsDropdown() {
  const { selectedPair, setSelectedPair } = useCoinPairStore();

  const handleCoinSelect = (value: unknown) => {
    setSelectedPair(value as string);
  };

  useEffect(() => {
    if (!selectedPair) setSelectedPair(coinsArr[0]);
  }, []);

  return (
    <StyledSelect
      defaultValue={selectedPair}
      options={coinsArr.map((el) => ({ value: el, label: el }))}
      onChange={handleCoinSelect}
    />
  );
}

export default CoinsDropdown;
