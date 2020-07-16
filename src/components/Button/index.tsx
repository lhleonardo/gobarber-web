import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonType> = ({ children, ...props }) => (
  <Container>
    <button type="button" {...props}>
      {children}
    </button>
  </Container>
);

export default Button;
