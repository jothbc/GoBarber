import React from 'react';

import { useTransition } from 'react-spring';
import { Container } from './styles';

import { ToastMessage } from '../../hooks/ToastContext';
import Toast from './Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  // recebe o array, a chave unica que identifica o item, e a animação
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120%',
        opacity: 0,
      },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
