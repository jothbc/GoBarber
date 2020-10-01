import React, { createContext, useCallback } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

// esse é o contexto em si
// dentro do create Context passamos a informação que esse contexto vai ter e o tipo
// como no primeiro momento nao faz sentido ja preencher com as infos, é feito o {} as AuthContext para dizer q esse objeto é desse formato
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

// componente que vai receber as rotas no children e vai ter todas as funções relacionadas a esse context
export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    console.log(response.data);
  }, []);

  // dentro do value vai tudo que o meu context ter, desde values até funcoes etc..
  return (
    <AuthContext.Provider value={{ name: 'Jonathan', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
