import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Example1 from './example1/Example1';
import Example2 from './example2/Example2';
import Example3 from './example3/Example3';

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
}

export default App;
