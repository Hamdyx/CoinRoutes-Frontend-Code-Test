import { StyledSelect } from '@lib/theme/components/Select';

import { coinsArr } from '../utils/coinsArr';

function CoinsDropdown() {
  const handleCoinSelect = (value: unknown) => {
    console.log('handleCoinSelect', { value });
  };

  return (
    <StyledSelect
      defaultValue={coinsArr[0]}
      options={coinsArr.map((el) => ({ value: el, label: el }))}
      onChange={handleCoinSelect}
    />
  );
}

export default CoinsDropdown;
