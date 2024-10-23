// theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  breakpoints: {
    // sm: '30em',
    // md: '48em',
    // lg: '62em',
    // xl: '80em',
    '2xl': '96em', // Custom 2xl breakpoint
  },
});

export default customTheme;
