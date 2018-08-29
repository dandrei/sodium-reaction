exports.__esModule = true;
var sodiumjs_1 = require("sodiumjs");
var sodium_reaction_1 = require("../sodium-reaction");
var validNumber = function (s) {
    var res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};
function default_1() {
    var id = 0;
    var newKey = function () { return id++; };
    // +/-
    var i$ = new sodiumjs_1.StreamSink();
    var d$ = new sodiumjs_1.StreamSink();
    // triggered from UI
    var change$ = new sodiumjs_1.StreamSink();
    var remove$ = new sodiumjs_1.StreamSink();
    // function streams
    var inc$ = i$.map(function (_) { return function (s) { return s.concat([{ key: newKey(), value: 0 }]); }; });
    var dec$ = d$.map(function (dec) { return function (s) { return s.slice(0, s.length + dec); }; });
    var chg$ = change$.map(function (chg) { return function (s) { return s.map(function (t) { return t.key === chg.key ? chg : t; }); }; });
    var rmv$ = remove$.map(function (key) { return function (s) { return s.filter(function (i) { return i.key !== key; }); }; });
    var inputs = inc$
        .orElse(dec$)
        .orElse(chg$)
        .orElse(rmv$)
        .accum([], function (f, s) { return f(s); });
    var sum = inputs.map(function (arr) { return arr.reduce(function (v, i) { return v + i.value; }, 0); });
    var count = inputs.map(function (s) { return s.length; });
    return sodium_reaction_1.sodiumReaction({
        up: function () { return i$.send(1); },
        dn: function () { return d$.send(-1); },
        change: function (k) { return function (e) { return change$.send({ key: k, value: validNumber(e.target.value) }); }; },
        remove: function (k) { return function (_) { return remove$.send(k); }; }
    }, { count: count, sum: sum, inputs: inputs });
}
exports["default"] = default_1;
;
