import * as React from 'react';
import {Cell, CellLoop, Stream, StreamSink, Transaction, Unit} from "sodiumjs";

export default class RExample1 extends React.Component {

    upClick: StreamSink<Unit>;
    dnClick: StreamSink<Unit>;
    state: { currentValue: string } = {
        currentValue: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const setText = (text: string) => {
            this.setState({currentValue: text});
        };

        Transaction.run(() => {
            const value: CellLoop<number> = new CellLoop<number>();

            this.upClick = new StreamSink<Unit>();
            this.dnClick = new StreamSink<Unit>();
            const sDelta: Stream<number> = this.upClick.map(u => 1)
                .orElse(this.dnClick.map(u => -1));

            const sUpdate: Stream<number> = sDelta
                .snapshot(value, (delta, _value) => {
                    return delta + _value;
                })
                .filter(n => n >= 0)
                .map(n => n);

            value.loop(sUpdate.hold(0));

            value.map(i => i.toString()).listen(setText);

            // Just for fun
            const ones: Cell<number> = value.map(c => c);
            const hundreds: Cell<number> = ones.map(o => o * 100);
            const sum = ones.lift(hundreds, (o, h) => o + h);
            sum.listen(s => console.log(s));

        });
    }

    render() {

        const doClick = (stream: StreamSink<Unit>) => () => {
            stream.send(Unit.UNIT);
        };

        return (
            <div>
                <div>
                    <button onClick={doClick(this.upClick)}>+</button>
                    <button onClick={doClick(this.dnClick)}>-</button>
                </div>
                <span>{this.state.currentValue}</span>
            </div>
        );
    }
}
