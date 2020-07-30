import React, { useEffect } from 'react';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/ToastContext';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
}

export const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();
  useEffect(() => {
    const time = setTimeout(() => removeToast(message.id), 3000);

    return () => {
      clearTimeout(time);
    };
  }, [removeToast, message]);

  return (
    <Container
      style={style}
      type={message.type}
      hasDescription={!!message.description}
    >
      <FiAlertCircle size={20} />

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};
