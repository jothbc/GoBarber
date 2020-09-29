import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';
import { Container, Error } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

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
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <input
        {...rest}
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
