import React from 'react';
import {
  RouteProps as RouteDomProps,
  Route as RouteDom,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends RouteDomProps {
  isPrivate?: boolean;
  // precisa tipar esse componente pois o padrao ele entende que esta passando desse formato (<Component />) e nao nesse {Component}
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  // rota privada / logado = exibir rota
  // rota privada / deslogado = login
  // rota nao privada / logado = dashboard
  // rota nao privada / deslogado = exibir rota

  // location-> ele mantem o historico de rotas no navegador, para a pessoa poder voltar para a pagina anterior e etc..
  return (
    <RouteDom
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
