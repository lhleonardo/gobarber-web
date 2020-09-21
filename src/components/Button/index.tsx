import React, { ButtonHTMLAttributes } from 'react';
import { PulseLoader } from 'react-spinners';

import { Container } from './styles';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonType> = ({ children, loading, ...props }) => (
  <Container {...props}>
    {loading ? <PulseLoader color="#312e50" size={10} /> : children}
  </Container>
);

export default Button;
