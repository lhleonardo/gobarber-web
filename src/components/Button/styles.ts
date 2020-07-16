import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 16px;
  padding: 16px;
  width: 100%;

  background: #ff9000;

  border: 0;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 500;

  color: #312e50;

  transition: background 200ms;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
