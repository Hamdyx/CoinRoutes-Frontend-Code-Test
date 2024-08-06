import themeToken from '@lib/theme/tokens';

export const getRowStyle = (key: string) => {
  const [, type, percentage] = key.split('-');

  return {
    background: `linear-gradient(to right, ${
      type === 'bids' ? themeToken['green-9'] : themeToken['red-9']
    } ${percentage}%, transparent ${percentage}%)`,
  };
};
