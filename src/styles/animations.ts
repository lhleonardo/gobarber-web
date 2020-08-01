import { keyframes } from 'styled-components';

export const appearFromRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const appearFromLeft = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
`;
