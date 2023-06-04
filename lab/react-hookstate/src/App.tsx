import { Box } from '@chakra-ui/react';
import { Main } from '@src/components'
import './App.css';
import { FormikComp1 } from './formik-components/formik-comp1';
import { Immer1 } from './immer-components/immer1';

function App() {
  return (
    <Box>
      {/* <Main /> */}
      <FormikComp1 />
      {/* <Immer1 /> */}
    </Box>
  );
}

export default App;
