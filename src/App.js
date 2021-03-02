import React, { useState } from 'react';
import Lists from './components/Lists';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h4 className="header">
          <i className="far fa-star"></i>
          Universtar
        </h4>

        <div className="design">
          <Lists />
        </div>
      </div>
    </DndProvider>
  );
}
