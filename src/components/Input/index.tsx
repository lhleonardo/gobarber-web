import React, { InputHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input type="text" name={name} {...props} />
  </Container>
);

export default Input;
