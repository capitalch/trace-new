import { Box } from '@chakra-ui/react';
import './App.css';
import { Comp1 } from './components/comp1';
import { Comp2 } from './components/comp2';
import { Comp3 } from './components/comp3';

function App() {
  return (
    <Box>
      <Comp1 />
      <Comp3 />
    </Box>
  );
}

export default App;
