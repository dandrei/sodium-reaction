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
var SExample1 = /** @class */ (function (_super) {
    __extends(SExample1, _super);
    function SExample1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: ''
        };
        _this.doClick = function (stream) { return function () {
            stream.send(sodiumjs_1.Unit.UNIT);
        }; };
        return _this;
    }
    SExample1.prototype.componentDidMount = function () {
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
    SExample1.prototype.setText = function (text) {
        this.setState({ currentValue: text });
    };
    SExample1.prototype.render = function () {
        return (<div>
                <div>
                    <button onClick={this.doClick(this.upClick)}>+</button>
                    <button onClick={this.doClick(this.dnClick)}>-</button>
                </div>
                <span>{this.state.currentValue}</span>
            </div>);
    };
    return SExample1;
}(React.Component));
exports["default"] = SExample1;
