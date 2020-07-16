import styled from 'styled-components';

import { shade } from 'polished';

import background from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    text-align: center;

    margin-top: 80px;
    display: flex;
    flex-direction: column;

    width: 300px;

    h3 {
      margin-bottom: 10px;
      font-size: 24px;
      line-height: 32px;
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #f4ede8;
      margin-top: 24px;
      line-height: 21px;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  & > a {
    color: #ff9000;
    margin-top: 80px;
    display: flex;
    place-content: center;
    svg {
      margin-right: 10px;
    }
    &:hover {
      color: ${shade(0.3, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;
