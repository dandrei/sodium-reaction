var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var sodiumjs_1 = require("sodiumjs");
var SodiumExample1 = /** @class */ (function (_super) {
    __extends(SodiumExample1, _super);
    function SodiumExample1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: ''
        };
        _this.doClick = function (stream) { return function () {
            stream.send(sodiumjs_1.Unit.UNIT);
        }; };
        return _this;
    }
    SodiumExample1.prototype.componentDidMount = function () {
        var _this = this;
        sodiumjs_1.Transaction.run(function () {
            var value = new sodiumjs_1.CellLoop();
            var textValue = value.map(function (i) { return i.toString(); });
            sodiumjs_1.Operational.updates(textValue).listen(function (t) {
                _this.setText(t);
            });
            sodiumjs_1.Transaction.currentTransaction.post(0, function () {
                _this.setText(textValue.sample());
            });
            _this.upClick = new sodiumjs_1.StreamSink();
            _this.dnClick = new sodiumjs_1.StreamSink();
            var sDelta = _this.upClick.map(function (u) { return 1; })
                .orElse(_this.dnClick.map(function (u) { return -1; }));
            var sUpdate = sDelta.snapshot(value, function (delta, _value) {
                return delta + _value;
            }).filter(function (n) { return n >= 0; });
            value.loop(sUpdate.hold(0));
        });
    };
    SodiumExample1.prototype.setText = function (text) {
        this.setState({ currentValue: text });
    };
    SodiumExample1.prototype.render = function () {
        return (<div>
                <div>
                    <button onClick={this.doClick(this.upClick)}>+</button>
                    <button onClick={this.doClick(this.dnClick)}>-</button>
                </div>
                <span>{this.state.currentValue}</span>
            </div>);
    };
    return SodiumExample1;
}(React.Component));
exports["default"] = SodiumExample1;
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
