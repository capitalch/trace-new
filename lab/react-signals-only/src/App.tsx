import { Box } from '@chakra-ui/react';
import './App.css';
import { Comp1 } from './components/comp1';
import { Purchase } from './Purchases/purchase';

function App() {
  return (
    <Box m={10}>
      <Purchase />
    </Box>
  );
}

export default App;
