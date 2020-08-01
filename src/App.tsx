import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import { AppContext } from './hooks';
import { Routes } from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppContext>
      <Routes />
    </AppContext>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
