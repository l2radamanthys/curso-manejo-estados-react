import './App.css';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import React from "react";

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <ClassState name="Class State" />
    </div>
  );
}

export default App;
