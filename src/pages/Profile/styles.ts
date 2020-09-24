import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.header`
  height: 144px;
  width: 100%;

  background: #28262e;

  display: flex;
  align-items: center;

  div {
    width: 1120px;
    padding: 0 32px;
    margin: 0 auto;

    > a {
      text-decoration: none;
      color: #999591;
    }
  }
`;

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: -100px auto 0;

  form {
    width: 400px;

    display: flex;
    flex-direction: column;

    h3 {
      margin-bottom: 16px;
    }

    button[type='submit'] {
      margin-top: 32px;
    }
  }
`;

export const AvatarInput = styled.div`
  display: flex;
  align-self: center;

  cursor: pointer;

  position: relative;
  width: 250px;

  img {
    width: 250px;
    height: 250px;

    border-radius: 50%;
    border: 4px solid #999591;
  }

  label {
    position: absolute;
    right: 0;
    bottom: 0;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 70px;
    height: 70px;
    border-radius: 50%;

    border: none;
    outline: none;

    background: #ff9000;

    transition: background 0.1s;

    svg {
      color: #28262e;
    }

    input {
      display: none;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
