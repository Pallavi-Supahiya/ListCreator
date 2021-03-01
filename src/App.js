import React from 'react';
import Lists from './components/Lists';

import './App.scss';

export default function App() {
  return (
    <div className="App">
      <h4 className="header">
        <i className="far fa-star"></i>
        Universtar
      </h4>

      <div className="design">
        <Lists />
      </div>
    </div>
  );
}
