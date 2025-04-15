"use client";

import { createGlobalStyle } from 'styled-components';

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'GI';
    src:  url('/assets/fonts/G.I.-400.ttf') format('truetype'),
          url('/assets/fonts/G.I.-400.woff') format('woff'),
          url('/assets/fonts/G.I.-400.woff2') format('woff2'),
          url('/assets/fonts/G.I.-530.ttf') format('truetype'),
          url('/assets/fonts/G.I.-530.woff') format('woff'),
          url('/assets/fonts/G.I.-530.woff2') format('woff2'),
          url('/assets/fonts/G.I.-750.ttf') format('truetype'),
          url('/assets/fonts/G.I.-750.woff') format('woff'),
          url('/assets/fonts/G.I.-750.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GI';
    src:  url('/assets/fonts/G.I.-400Italic.ttf') format('truetype'),
          url('/assets/fonts/G.I.-400Italic.woff') format('woff'),
          url('/assets/fonts/G.I.-400Italic.woff2') format('woff2'),
          url('/assets/fonts/G.I.-530Italic.ttf') format('truetype'),
          url('/assets/fonts/G.I.-530Italic.woff') format('woff'),
          url('/assets/fonts/G.I.-530Italic.woff2') format('woff2'),
          url('/assets/fonts/G.I.-750Italic.ttf') format('truetype'),
          url('/assets/fonts/G.I.-750Italic.woff') format('woff'),
          url('/assets/fonts/G.I.-750Italic.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  :root {
    --foreground-rgb: 0, 0, 0;
  }

  @font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v161/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2) format('woff2');
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
`;

export default FontStyle;