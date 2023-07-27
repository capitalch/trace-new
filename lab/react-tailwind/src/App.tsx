import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='m-4'>
      <button className ='w-16 md:w-32 lg:w-48 bg-violet-500  rounded-lg h-6 hover:bg-violet-600 text-white active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300' >Test</button>
      <button className='w-16 bg-red-500 rounded-lg text-white 2xl:bg-yellow-600'>Color</button>
    </div>
  );
}

export default App;
