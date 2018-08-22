exports.__esModule = true;
var sodiumjs_1 = require("sodiumjs");
var sodium_reaction_1 = require("../sodium-reaction");
function default_1() {
    var value$ = new sodiumjs_1.StreamSink();
    var value = value$.accum(0, function (a, v) { return a + v; });
    return sodium_reaction_1.sodiumReaction({
        up: function () { return value$.send(1); },
        dn: function () { return value$.send(-1); }
    }, { value: value });
}
exports["default"] = default_1;
;
