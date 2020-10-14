import React from 'react';

// esse stack navigation é um dos modos de navegação, ele diz que é navegação em pilha, ou seja, navegação por botoes..
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

// é como se fosse o context api, ele engloba as rotas
const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      // screenOption tem configurações da barra que é criada automaticamente no header
      // aqui no caso foi desativado ela, mas poderia ser estilizada de qualquer forma...
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
