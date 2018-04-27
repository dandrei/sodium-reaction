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
var SodiumReaction_1 = require("./SodiumReaction");
var RExample2 = /** @class */ (function (_super) {
    __extends(RExample2, _super);
    function RExample2(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentValue: ''
        };
        return _this;
    }
    RExample2.prototype.componentDidMount = function () {
        var _this = this;
        var setText = function (text) {
            _this.setState({ currentValue: text });
        };
        var _a = SodiumReaction_1.pair("0"), funcA = _a[0], cellA = _a[1];
        var _b = SodiumReaction_1.pair("0"), funcB = _b[0], cellB = _b[1];
        var validate = function (cell) {
            return cell.map(function (s) {
                var res = parseInt(s, 10);
                return isNaN(res) ? 0 : res;
            });
        };
        var a = validate(cellA);
        var b = validate(cellB);
        var sum = a.lift(b, function (a_, b_) { return a_ + b_; });
        sum.map(function (i) { return i.toString(); }).listen(setText);
        var forward = function (func) { return function (e) {
            func(e.target.value);
        }; };
        this.onChangeA = forward(funcA);
        this.onChangeB = forward(funcB);
    };
    RExample2.prototype.render = function () {
        return (<div>
                <div>
                    <input onChange={this.onChangeA}/>
                    <input onChange={this.onChangeB}/>
                </div>
                <span>{this.state.currentValue}</span>
            </div>);
    };
    return RExample2;
}(React.Component));
exports["default"] = RExample2;
