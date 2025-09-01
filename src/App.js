import './App.css';
import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer.js';
import React from "react";

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <br />
      <hr />
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
