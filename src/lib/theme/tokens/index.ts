import { theme } from 'antd';

import colors from './colors';
import fonts from './fonts';

const themeValues = theme.getDesignToken();

export default {
  ...themeValues,
  ...colors,
  ...fonts,
};
