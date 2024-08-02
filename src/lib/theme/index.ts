import { ThemeConfig } from 'antd';

import themeToken from './tokens';
import { layoutTheme } from './components/Layout';

const theme = {
  token: {
    ...themeToken,
  },
  components: {
    Layout: layoutTheme,
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
} as ThemeConfig;

export default theme;
