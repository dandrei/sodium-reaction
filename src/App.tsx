import React from 'react';
import './App.css';
import {Example1} from "./example1/Example1";
import {Example2} from "./example2/Example2";
import {Example3} from "./example3/Example3";

function App() {
  return (
      <div className="App">
        <div className="App-intro">
          <fieldset>
            <legend>Example 1</legend>
            <Example1/>
          </fieldset>

          <fieldset>
            <legend>Example 2</legend>
            <Example2/>
          </fieldset>

          <fieldset>
            <legend>Example 3</legend>
            <Example3/>
          </fieldset>
        </div>
      </div>
  );
}

export default App;
