import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const { registerField, fieldName, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => {
    setFocused(false);
    setFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container focused={focused} filled={filled}>
      {Icon && <Icon size={20} />}
      <input
        autoComplete="false"
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        {...props}
      />
    </Container>
  );
};

export default Input;
