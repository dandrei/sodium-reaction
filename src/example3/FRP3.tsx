import * as React from 'react';
import {Cell, Stream, StreamSink} from "sodiumjs";
import {Renderer, SodiumReaction} from "../lib/SodiumReaction";

const validNumber = (s: string) => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

type KeyValue = { key: number, value: number };

export function FRP3({render}: { render: Renderer<typeof actions, typeof initState> }) {

    const initState = {
        count: 0,
        sum: 0,
        inputs: [] as KeyValue[]
    }

    let id = 0;
    const newKey = () => id++;

    // +/-
    const i$ = new StreamSink<number>();
    const d$ = new StreamSink<number>();

    // triggered from UI
    const change$ = new StreamSink<KeyValue>();
    const remove$ = new StreamSink<number>();

    // function streams
    type Stream$ = Stream<(_: KeyValue[]) => KeyValue[]>;
    const inc$: Stream$ = i$.map(() => s => [...s, {key: newKey(), value: 0}]);
    const dec$: Stream$ = d$.map(v => s => s.slice(0, s.length + v));
    const chg$: Stream$ = change$.map(chg => s => s.map(t => t.key === chg.key ? chg : t));
    const rmv$: Stream$ = remove$.map(key => s => s.filter(i => i.key !== key));

    const inputs: Cell<KeyValue[]> = inc$
        .orElse(dec$)
        .orElse(chg$)
        .orElse(rmv$)
        .accum([] as KeyValue[], (f, s) => f(s));

    const sum: Cell<number> = inputs.map(arr => arr.reduce((v, i) => v + i.value, 0));
    const count: Cell<number> = inputs.map(s => s.length);

    const actions = {
        up: () => i$.send(1),
        dn: () => d$.send(-1),
        change: (k: number) =>
            (e: React.ChangeEvent<HTMLInputElement>) =>
                change$.send({
                    key: k,
                    value: validNumber(e.target.value)
                }),
        remove: (k: number) => () => remove$.send(k),
    };

    return <SodiumReaction<typeof actions, typeof initState>
        render={render}
        actions={actions}
        initState={initState}
        sodiumState={{count, sum, inputs}}
    />
}



