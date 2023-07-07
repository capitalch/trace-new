import { Box } from '@chakra-ui/react';
import { Main } from '@src/components'
import './App.css';
import { FormikComp1 } from './formik-components/formik-comp1';
import { Immer1 } from './immer-components/immer1';
import { SyncfusionGrid1 } from './syncfusion/syncfusion-grid1';
import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import { UnderstandUseCallback } from './components/understand-use-callback';
import { SyncfusionAccordion } from './syncfusion/syncfusion-accordion';
import { Immer2 } from './immer-components/immer2';

function App() {
  return (
    <Box>
      {/* <UnderstandUseCallback /> */}
      <Immer2 />
      {/* <SyncfusionGrid1 /> */}
      {/* <SyncfusionAccordion /> */}
      {/* <Main /> */}
      {/* <FormikComp1 /> */}
      {/* <Immer1 /> */}
    </Box>
  );
}

export default App;
