import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  border: 2px solid #232129;
  border-radius: 10px;

  background: #232129;

  &:hover {
    background: ${shade(0.7, '#232129')};
  }

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
    color: #666360;
  }
`;
