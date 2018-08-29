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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var sodiumjs_1 = require("sodiumjs");
var React = require("react");
function bindState(component, stateDefinition) {
    var state = {};
    var _loop_1 = function (key) {
        var _a;
        var cell = stateDefinition[key];
        bindValue(cell, function (v) {
            var _a;
            return component.setState((_a = {}, _a[key] = v, _a));
        });
        state = __assign({}, state, (_a = {}, _a[key] = cell.sample(), _a));
    };
    for (var key in stateDefinition) {
        _loop_1(key);
    }
    return state;
}
function bindValue(cell, call) {
    sodiumjs_1.Operational.updates(cell).listen(function (t) {
        call(t);
    });
}
var SodiumReaction = /** @class */ (function (_super) {
    __extends(SodiumReaction, _super);
    function SodiumReaction(props) {
        var _this = _super.call(this, props) || this;
        _this.state = bindState(_this, _this.props.stateDefinition);
        return _this;
    }
    SodiumReaction.prototype.render = function () {
        // @ts-ignore
        return this.props.children(__assign({}, this.props, { state: this.state }));
    };
    return SodiumReaction;
}(React.PureComponent));
function sodiumReaction(props, stateDefinition) {
    return function (_props) { return (<SodiumReaction {...props} stateDefinition={stateDefinition}>{_props.children}</SodiumReaction>); };
}
exports.sodiumReaction = sodiumReaction;
