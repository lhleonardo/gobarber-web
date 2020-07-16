import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonType> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

export default Button;
