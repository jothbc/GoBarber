import React from 'react';
import Signin from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  );
};

export default App;
