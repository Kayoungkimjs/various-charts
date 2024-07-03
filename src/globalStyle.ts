import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    font-family: 'Lato', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html {
    font-family: 'Lato', sans-serif;
  }

  body {
    font-family: 'Lato', sans-serif;
    color: '#000';
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
  }

  button,
  input,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  button {
    padding: 0;
  }

  cite {
    font-style: normal;
    color: inherit;
  }

  canvas {
    max-width: 1200px;
    max-height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
