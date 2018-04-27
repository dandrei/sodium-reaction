import * as React from 'react';
import {ChangeEvent} from "react";
import {Cell, StreamSink, Unit} from "sodiumjs";

import {pair} from './sodium-reaction';


export default class RExample2 extends React.Component {

    state = {
        currentValue: ''
    };

    private onChangeA: (event: ChangeEvent<HTMLInputElement>) => void;
    private onChangeB: (event: ChangeEvent<HTMLInputElement>) => void;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const setText = (text: string) => {
            this.setState({currentValue: text});
        };

        const [funcA, cellA] = pair<string>("0");
        const [funcB, cellB] = pair<string>("0");

        const validate = (cell) => {
            return cell.map(s => {
                const res = parseInt(s, 10);
                return isNaN(res) ? 0 : res;
            });
        };
        const a: Cell<number> = validate(cellA);
        const b: Cell<number> = validate(cellB);

        const sum: Cell<number> = a.lift(b, (a_, b_) => a_ + b_);

        sum.map(i => i.toString()).listen(setText);

        const forward = (func) => (e: ChangeEvent<HTMLInputElement>) => {
            func(e.target.value);
        };

        this.onChangeA = forward(funcA);
        this.onChangeB = forward(funcB);
    }

    render() {
        return (
            <div>
                <div>
                    <input onChange={this.onChangeA}/>
                    <input onChange={this.onChangeB}/>
                </div>
                <span>{this.state.currentValue}</span>
            </div>
        );
    }
}
