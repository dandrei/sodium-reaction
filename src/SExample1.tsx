import * as React from 'react';
import {Cell, CellLoop, Operational, Stream, StreamSink, Transaction, Unit} from "sodiumjs";

class SExample1 extends React.Component {

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

export default SExample1;