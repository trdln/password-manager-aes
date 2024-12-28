import type { Config } from 'tailwindcss';
import { colors } from './utils/styles';

export default <Partial<Config>>{
  important: true,
  theme: {
    screens: {
      sm: { min: '600px' },
      md: { min: '960px' },
      lg: { min: '1280px' },
      xl: { min: '1920px' },
    },
    extend: {
      colors: {
        ...colors,
        primary: {},
        typo: {},
      },
    },
  },
};
