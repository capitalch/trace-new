import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PictureUpload } from './components/picture-upload';
import { LodashTest } from './components/lodash-test';
import { TailWindTabs } from './components/tailwind-tabs';
import { TailWindTabs1 } from './components/tailwind-tabs1';
import { CustomTabs } from './components/tabs/custom-tabs';

function App() {
  return (
    <div className='m-4'>
      <CustomTabs />
      {/* <TailWindTabs /> */}
      {/* <TailWindTabs1 /> */}
      {/* <PictureUpload />
      <LodashTest /> */}
    </div>
  );
}

export default App;
