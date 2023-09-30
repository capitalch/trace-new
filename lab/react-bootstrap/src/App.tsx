import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Comp1 } from './components/comp1';
import { Comp2SyncfusionGrid } from './components/comp2-syncfusion-grid';
// import { registerLicense } from '@syncfusion/ej2-base'
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-dropdowns/styles/material.css";

function App() {
  // syncfusion grid
  // registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhedHVVR2RZU0J+XEA=')

  return (
    <div>
      <Comp2SyncfusionGrid />
    </div>
  );
}

export default App;
