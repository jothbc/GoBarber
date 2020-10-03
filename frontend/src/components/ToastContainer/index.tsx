import React from 'react';

import { Container } from './styles';

import { ToastMessage } from '../../hooks/ToastContext';
import Toast from './Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  return (
    <Container>
      {messages &&
        messages.map((message) => <Toast key={message.id} message={message} />)}
    </Container>
  );
};

export default ToastContainer;
