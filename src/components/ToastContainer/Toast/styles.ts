import styled, { css } from 'styled-components';

import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  hasDescription: boolean;
}

const toastAppearences = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  warning: css`
    background: #fce4c5;
    color: #cc7e18;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div) <ContainerProps>`
  width: 380px;
  padding: 16px 30px 16px 16px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;

  ${props => toastAppearences[props.type || 'info']}

  >svg {
    margin: 4px 12px 0px 0px;
  }

  & + div {
    margin-top: 8px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    border: 0;
    padding: 0;
    outline: 0;

    background: transparent;
    color: inherit;

    position: absolute;
    top: 15px;
    right: 15px;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }

      button {
        top: 20px;
      }
    `}
`;
