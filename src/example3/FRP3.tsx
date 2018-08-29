import * as React from 'react';
import {Cell, Stream, StreamSink} from "sodiumjs";

import {sodiumReaction} from '../sodium-reaction';

const validNumber = s => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

type Input = { key: number, value: number };

export default function () {
    let id = 0;
    const newKey = () => id++;

    // +/-
    const i$ = new StreamSink<number>();
    const d$ = new StreamSink<number>();

    // triggered from UI
    const change$ = new StreamSink<Input>();
    const remove$ = new StreamSink<number>();

    // function streams
    const inc$: Stream<Function> = i$.map(_ => s => [...s, {key: newKey(), value: 0}]);
    const dec$: Stream<Function> = d$.map(dec => s => s.slice(0, s.length + dec));
    const chg$: Stream<Function> = change$.map(chg => s => s.map(t => t.key === chg.key ? chg : t));
    const rmv$: Stream<Function> = remove$.map(key => s => s.filter(i => i.key !== key));

    const inputs: Cell<Array<Input>> = inc$
        .orElse(dec$)
        .orElse(chg$)
        .orElse(rmv$)
        .accum([], (f, s) => f(s));

    const sum: Cell<number> = inputs.map(arr => arr.reduce((v, i) => v + i.value, 0));
    const count: Cell<number> = inputs.map(s => s.length);

    return sodiumReaction({
            up: _ => i$.send(1),
            dn: _ => d$.send(-1),
            change: k => e => change$.send({key: k, value: validNumber(e.target.value)}),
            remove: k => _ => remove$.send(k),
        },
        {count, sum, inputs}
    );
};



