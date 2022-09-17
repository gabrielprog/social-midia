import React from 'react';
import { 
  ChakraProvider
 } from '@chakra-ui/react';
import { FeedProvider } from './providers/FeedContext';
import { IdProvider } from './providers/IdContext';

import theme from './theme';
import Home from './pages/Home';


function App() {
  return (
    <ChakraProvider 
    theme={theme}
    >
      <FeedProvider>
        <IdProvider>
          <Home />
        </IdProvider>
      </FeedProvider>
    </ChakraProvider>
  );
}

export default App;
