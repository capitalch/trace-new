import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Comp1 } from './components/comp1';
import { ChakraProvider, } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true
});

function App() {
  return (

    <ChakraProvider>
      <CacheProvider value={emotionCache}>
        <Comp1 />
      </CacheProvider>
    </ChakraProvider>

  );
}

export default App;
