import React from 'react';
import { ReducerComp1 } from './components/reducer-comp1';
import { ReduxCounter } from './components/redux-counter/redux-counter';
import { MultiCounterContainer } from './components/multi-counter/multi-counter-container';
import { RandomMessageEmitter, RandomMessageViewer } from './components/misc-redux/random-message';
import { MiscReduxContainer } from './components/misc-redux/misc-redux-container';
import { DynamicMenu } from './components/dynamic-menu/dynamic-menu';
import { ObjectHierarchy } from './components/object-hierarchy';
import { CustomAccordion } from './components/custom-accordion';

function App() {
  return (
    <div className="App">
      {/* <CustomAccordion />
      <ObjectHierarchy /> */}
      {/* <ReducerComp1 /> */}
      <ReduxCounter />
      {/* <MultiCounterContainer />
      <DynamicMenu />
      <MiscReduxContainer /> */}
    </div>
  );
}

export default App;
