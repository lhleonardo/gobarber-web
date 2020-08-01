import styled from 'styled-components';

import { shade } from 'polished';
import background from '../../assets/sign-up-background.png';
import { appearFromRight, appearFromLeft } from '../../styles/animations';

export const Container = styled.div`
  display: flex;
  justify-content: stretch;

  height: 100vh;

  overflow: hidden;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;

  animation: ${appearFromLeft} 500ms;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  width: 100%;
  max-width: 700px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  animation: ${appearFromRight} 500ms;

  form {
    text-align: center;
    margin-top: 100px;
    width: 50%;

    h3 {
      margin-bottom: 16px;
      font-size: 2px;
    }
  }

  a {
    margin-top: 100px;

    text-decoration: none;

    display: flex;
    align-items: center;

    color: #f4ede8;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
