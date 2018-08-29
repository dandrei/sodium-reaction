import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RExample1 from './example1/RExample1';
import RExample2 from './example2/RExample2';
import RExample3 from './example3/RExample3';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Sodium Reaction</h1>
                </header>
                <div className="App-intro">
                    <fieldset>
                        <legend>Example 1</legend>
                        <RExample1/>
                    </fieldset>

                    <fieldset>
                        <legend>Example 2</legend>
                        <RExample2/>
                    </fieldset>

                    <fieldset>
                        <legend>Example 3</legend>
                        <RExample3/>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default App;
