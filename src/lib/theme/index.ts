import { ThemeConfig } from 'antd';

import themeToken from './tokens';
import { layoutTheme } from './components/Layout';
import { selectTheme } from './components/Select';
import { tableTheme } from './components/Table';
import { inputNumberTheme } from './components/InputNumber';

const theme = {
  token: {
    ...themeToken,
  },
  components: {
    Layout: layoutTheme,
    Select: selectTheme,
    Table: tableTheme,
    InputNumber: inputNumberTheme,
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
} as ThemeConfig;

export default theme;
