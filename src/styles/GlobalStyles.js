import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BM DoHyeon';
    src: url('/src/assets/fonts/BMDOHYEON_ttf.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'BM HANNA_TTF';
    src: url('/src/assets/fonts/BMHANNA_11yrs_ttf.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

@font-face {
    font-family: 'LuckiestGuy-Regular';
    src: url('/src/assets/fonts/LuckiestGuy-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'KoreanHANAB';
    src: url('/src/assets/fonts/a한글나라AB.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/src/assets/fonts/Pretendard-ExtraBold.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/src/assets/fonts/Pretendard-Medium.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;
