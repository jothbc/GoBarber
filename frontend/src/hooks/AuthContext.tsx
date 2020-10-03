import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

/** esse é o contexto em si
dentro do create Context passamos a informação que esse contexto vai ter e o tipo
como no primeiro momento nao faz sentido ja preencher com as infos, é feito o {} as AuthContext para dizer q esse objeto é desse formato */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/** componente que vai receber as rotas no children e vai ter todas as funções relacionadas a esse context */
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    // primeiro verifico se ja tem um user setado no localstorage
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // caso tenha devolvo como valor inicial paraw o data o objeto do user
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // caso nao tenha devolve um objeto vazio
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // busca na api pelo usuario
    const response = await api.post('sessions', { email, password });

    // desestrutura o token e o user
    const { token, user } = response.data;

    // salva no localstorage o token e user
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    // seta o data com os valores de token e user
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    // o localstorage até tem um metodo localStorage.clear()
    // mas ele removeria até os itens que foram salvos por outras aplicações...
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  // dentro do value vai tudo que o meu context ter, desde values até funcoes etc..
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/** essa função evita de nas rotas ter que usar
    const {signin} = useContext(AuthContext);
    dessa forma podemos simplismente usar
    const {signIn} = useAuth(); */
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
