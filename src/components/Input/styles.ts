import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  filled: boolean;
  focused: boolean;

  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  border-radius: 10px;
  background: #232129;

  border: 2px solid #232129;
  color: #666360;

  ${props =>
    props.hasError &&
    css`
      border: 2px solid #c53030;
    `}

  ${props =>
    props.focused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

  ${props =>
    props.filled &&
    css`
      color: #ff9000;
    `}


  & + div {
    margin-top: 8px;
  }

  input {
    color: #f4ede8;
    background: transparent;
    border: none;

    flex: 1;
    padding: 16px;

    transition: all 400ms;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-left: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  /* margin-left: 16px; */
  svg {
    margin: 0;
  }

  span {
    background: #c93030;
    color: #f4ede8;

    &::before {
      border-color: #c93030 transparent;
    }
  }
`;
