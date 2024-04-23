import React from 'react';
import Routes from './routes';
import UserContextProvider from './userContext';

const App = () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
