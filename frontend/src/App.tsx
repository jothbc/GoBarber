import React from 'react';
import Signin from './pages/SignIn';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <Signin />
      <GlobalStyle />
    </>
  );
};

export default App;
