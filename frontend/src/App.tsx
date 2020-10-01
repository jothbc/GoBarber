import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';

// importação do component do contexto do auth
// onde o AuthProvider recebe o children que sao as rotas que vao ter acesso ao AuthContext.Provider
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
