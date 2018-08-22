exports.__esModule = true;
var sodiumjs_1 = require("sodiumjs");
var sodium_reaction_1 = require("../sodium-reaction");
var validNumber = function (s) {
    var res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};
function default_1() {
    var a$ = new sodiumjs_1.StreamSink();
    var b$ = new sodiumjs_1.StreamSink();
    var a = a$.hold("0").map(validNumber);
    var b = b$.hold("0").map(validNumber);
    var sum = a.lift(b, function (a_, b_) { return a_ + b_; });
    return sodium_reaction_1.sodiumReaction({
        changedA: function (e) { return a$.send(e.target.value); },
        changedB: function (e) { return b$.send(e.target.value); }
    }, { sum: sum });
}
exports["default"] = default_1;
;
