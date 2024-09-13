// theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#405D72', // Your custom primary color
    },
    secondary: {
      main: '#FF5722', // Optionally, define secondary color as well
    },
    // You can add more customizations here if needed
  },
});

export default theme;
