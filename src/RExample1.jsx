var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var sodiumjs_1 = require("sodiumjs");
var RExample1 = /** @class */ (function (_super) {
    __extends(RExample1, _super);
    function RExample1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: ''
        };
        return _this;
    }
    RExample1.prototype.componentDidMount = function () {
        var _this = this;
        var setText = function (text) {
            _this.setState({ currentValue: text });
        };
        sodiumjs_1.Transaction.run(function () {
            var value = new sodiumjs_1.CellLoop();
            _this.upClick = new sodiumjs_1.StreamSink();
            _this.dnClick = new sodiumjs_1.StreamSink();
            var sDelta = _this.upClick.map(function (u) { return 1; })
                .orElse(_this.dnClick.map(function (u) { return -1; }));
            var sUpdate = sDelta
                .snapshot(value, function (delta, _value) {
                return delta + _value;
            })
                .filter(function (n) { return n >= 0; })
                .map(function (n) { return n; });
            value.loop(sUpdate.hold(0));
            value.map(function (i) { return i.toString(); }).listen(setText);
            // Just for fun
            var ones = value.map(function (c) { return c; });
            var hundreds = ones.map(function (o) { return o * 100; });
            var sum = ones.lift(hundreds, function (o, h) { return o + h; });
            sum.listen(function (s) { return console.log(s); });
        });
    };
    RExample1.prototype.render = function () {
        var doClick = function (stream) { return function () {
            stream.send(sodiumjs_1.Unit.UNIT);
        }; };
        return (<div>
                <div>
                    <button onClick={doClick(this.upClick)}>+</button>
                    <button onClick={doClick(this.dnClick)}>-</button>
                </div>
                <span>{this.state.currentValue}</span>
            </div>);
    };
    return RExample1;
}(React.Component));
exports["default"] = RExample1;
