import { ThemeConfig } from 'antd';

import themeToken from './tokens';
import { layoutTheme } from './components/Layout';
import { selectTheme } from './components/Select';

const theme = {
  token: {
    ...themeToken,
  },
  components: {
    Layout: layoutTheme,
    Select: selectTheme,
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
} as ThemeConfig;

export default theme;
