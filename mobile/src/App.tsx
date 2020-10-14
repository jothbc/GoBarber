import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    // navigationContainer é como se fosse o apicontext, ele serve para transitar informações de uma tela para a outra
    //para usar o Routes é necessário dele...
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        {/* rotas */}
        <Routes/>
      </View>
    </NavigationContainer>
  )
};

export default App;
