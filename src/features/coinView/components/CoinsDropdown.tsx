import { StyledSelect } from '@lib/theme/components/Select';
import { useCoinPairStore } from '@/stores/coinPair';

import { coinsArr } from '../utils/coinsArr';

function CoinsDropdown() {
  const { selectedPair, setSelectedPair, resetState } = useCoinPairStore();

  const handleCoinSelect = (value: unknown) => {
    resetState();
    setSelectedPair(value as string);
  };

  return (
    <StyledSelect
      defaultValue={selectedPair}
      options={coinsArr.map((el) => ({ value: el, label: el }))}
      onChange={handleCoinSelect}
    />
  );
}

export default CoinsDropdown;
