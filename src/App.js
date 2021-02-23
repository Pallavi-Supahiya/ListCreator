import React, { Component } from 'react';
import './App.css';
//import Background from './assets/images/RJ.jpg';

import TaskList from  './components/TaskList';

class App extends Component {


  render () {
    return (
      <div className="App" >
        <h1>RJ</h1>
        <TaskList />
      </div>
    );
    }; 
  }


export default App;
