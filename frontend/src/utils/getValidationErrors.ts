import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

// obtem os erros do yup e retorna um array com index string e valor string
export default function getValidationErros(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
