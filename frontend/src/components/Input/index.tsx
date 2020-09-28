import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // quando quero mandar um componente icon: React.ComponentType;
  // o component nao vai vir com as tipagens, entao é necessário buscar as tipagens do componente em especifico
  // nesse caso do react-icons, para ai entao ter acesso as tipagens de size color etc..
  icon?: React.ComponentType<IconBaseProps>;
}
// foi renomeado o icon para Icon pois para poder usar a tag (<icon>) o react nao entenderia que isso é um component
// ja assim (<Icon>) ele entenderia
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      // name = namefield pois o usefield pode alterar o nome do input com base em algumas funções internas
      name: fieldName,
      // ref do input, que no caso esta dentro de current
      ref: inputRef.current,
      // caminho onde ele vai achar o valor do campo, no caso document.querySelector('input').value
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} ref={inputRef} defaultValue={defaultValue} />
    </Container>
  );
};
export default Input;
