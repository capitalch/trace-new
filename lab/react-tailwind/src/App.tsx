import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PictureUpload } from './components/picture-upload';
import { LodashTest } from './components/lodash-test';

function App() {
  return (
    <div className='m-4'>
      <PictureUpload />
      <LodashTest />
    </div>
  );
}

export default App;
