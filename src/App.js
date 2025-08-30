import './App.css';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import React from "react";

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;
