import { StyledSelect } from '@lib/theme/components/Select';
import { useCoinPairStore } from '@/stores/coinPair';

import { useGetCoins } from '../api/getCoins';

function CoinsDropdown() {
  const { data: coinsData } = useGetCoins({});
  const { selectedPair, setSelectedPair, resetState } = useCoinPairStore();

  const handleCoinSelect = (value: unknown) => {
    resetState();
    setSelectedPair(value as string);
  };

  return (
    <StyledSelect
      defaultValue={selectedPair}
      options={coinsData?.map((el) => ({ value: el.id, label: el.id }))}
      onChange={handleCoinSelect}
    />
  );
}

export default CoinsDropdown;
