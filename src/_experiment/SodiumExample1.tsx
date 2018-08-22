import * as React from 'react';
import {Cell, CellLoop, Operational, Stream, StreamSink, Transaction, Unit} from "sodiumjs";

class SodiumExample1 extends React.Component {

    upClick: StreamSink<Unit>;
    dnClick: StreamSink<Unit>;
    state = {
        currentValue: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Transaction.run(() => {
            const value: CellLoop<number> = new CellLoop<number>();

            const textValue: Cell<string> = value.map(i => i.toString());
            Operational.updates(textValue).listen(t => {
                this.setText(t);
            });
            Transaction.currentTransaction.post(0, () => {
                this.setText(textValue.sample());
            });

            this.upClick = new StreamSink<Unit>();
            this.dnClick = new StreamSink<Unit>();
            const sDelta: Stream<number> = this.upClick.map(u => 1)
                .orElse(this.dnClick.map(u => -1));

            const sUpdate: Stream<number> = sDelta.snapshot(value, (delta, _value) => {
                return delta + _value;
            }).filter(n => n >= 0);

            value.loop(sUpdate.hold(0));
        });
    }

    setText(text: string) {
        this.setState({currentValue: text});
    }

    doClick = (stream: StreamSink<Unit>) => () => {
        stream.send(Unit.UNIT);
    };

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.doClick(this.upClick)}>+</button>
                    <button onClick={this.doClick(this.dnClick)}>-</button>
                </div>
                <span>{this.state.currentValue}</span>
            </div>
        );
    }
}

export default SodiumExample1;

// Sodium does not glitch (produce inconsistent states) (RxJS does)

// const ones: Cell<number> = valueLoop.map(c => c);
// const hundreds: Cell<number> = ones.map(o => o * 100);
// const sum = ones.lift(hundreds, (o, h) => o + h);
// sum.listen(s => console.log(s));

// If it needs to be packed up in an explicit transaction

// Transaction.run(() => {
// });

// Verbose accumulator

// const valueLoop: CellLoop<number> = new CellLoop<number>();
// const update$: Stream<number> = delta$.snapshot(valueLoop, (d, v) => d + v)
//     .filter(n => n >= 0)
//     .map(n => n);
// valueLoop.loop(update$.hold(0));
// const value: Cell<string> = valueLoop.map(s => s.toString());

// Create an "entangled" pair: a cell and a callback function to put values in the cell, via a stream
// Decided not to go this way

// export function pair<T>(initial: T): [(T) => void, Cell<T>] {
//
//     const stream: StreamSink<T> = new StreamSink<T>();
//     const call: (T) => void = (value: T) => {
//         stream.send(value);
//     };
//
//     const cell: Cell<T> = stream.hold(initial);
//     return [call, cell];
// }