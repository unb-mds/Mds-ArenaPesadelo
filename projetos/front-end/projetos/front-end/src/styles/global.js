import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 14px;
    --pink: #D92856;
    --green: #28C90E;
    --light-gray: #424242;
    --white: #fff;
    --heavy-gray: #222;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
  }

  button {
    background-color: transparent;
    border: 0;
    font-weight: 500;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
