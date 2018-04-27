exports.__esModule = true;
var sodiumjs_1 = require("sodiumjs");
function pair(initial) {
    var stream = new sodiumjs_1.StreamSink();
    var call = function (value) {
        stream.send(value);
    };
    var cell = stream.hold(initial);
    return [call, cell];
}
exports.pair = pair;
function pipe(cell, call) {
    sodiumjs_1.Operational.updates(cell).listen(function (t) {
        call(t);
    });
}
exports.pipe = pipe;
