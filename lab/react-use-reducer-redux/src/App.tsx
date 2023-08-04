import React from 'react';
import { ReducerComp1 } from './components/reducer-comp1';
import { ReduxCounter } from './components/redux-counter';
import { MultiCounterContainer } from './components/multi-counter/multi-counter-container';
import { RandomMessageEmitter, RandomMessageViewer } from './components/misc-redux/random-message';
import { MiscReduxContainer } from './components/misc-redux/misc-redux-container';

function App() {
  return (
    <div className="App">
        {/* <ReducerComp1 /> */}
        {/* <ReduxCounter /> */}
        <MultiCounterContainer />
        <MiscReduxContainer />
        
    </div>
  );
}

export default App;
