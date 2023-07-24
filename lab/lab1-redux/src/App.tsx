import './App.css';
import { FormikForm } from './components/formik-form';
import { createContext } from 'react'
// import { GlobalStateParentComponent } from './global-state-from-hook/global-state-parent-component';
// import { IbukiParent } from './ibuki-parent-child/ibuki-parent-child';
// import { Poc1Parent } from './poc-parent-child-render/poc1-parent';
// import { BootstrapComponent } from './components/bootstrap-component';

function App() {
  // const filter = true  
  const someValue = {
    project: 'CRMLS',
    dev1:'Sushant',
    dev2: 'Shubhro'
  }
  return (
    <div className="App">
      <MyContext.Provider value={someValue}>
        <FormikForm />
        {/* <BootstrapComponent /> */}
        {/* <GlobalStateParentComponent /> */}
        {/* <Poc1Parent /> */}
        {/* <IbukiParent /> */}
      </MyContext.Provider>
    </div>
  );
}

export default App;

const MyContext = createContext({})
export {MyContext}
