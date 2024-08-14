import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --black: #0B0B0B;
    --heavy-gray: #282828;
    --medium-gray: #575757;
    --light-gray: #A0A0A0;
    --white-smoke: #F8F8F8;
    --white: #FFFFFF;

    --light-pink: #FFEFF3;
    --salmon: #E0416A;
    --pink: #DA1F4F;
    --heavy-pink: #BA153F;
    --red: #971023;

    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
  }

  html, body, input, button, select, option, textarea {
    font-family: 'Inter', sans-serif;
  }

  button {
    font-weight: 500;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  input, select, option, textarea {
    font-weight: 400;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;
