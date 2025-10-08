// in frontend/src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* New background gradient and text color */
    background: linear-gradient(135deg, #23153C 0%, #120B1F 100%);
    background-attachment: fixed;
    color: #FFFFFF;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;