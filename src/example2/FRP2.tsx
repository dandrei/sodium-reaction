import * as React from 'react';
import {Cell, StreamSink} from "sodiumjs";

import {ChangeEvent} from "react";
import {Renderer, SodiumReaction} from "../lib/SodiumReaction";

const validNumber = (s: string) => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

export function FRP2({render}: { render: Renderer<typeof actions, typeof initState> }) {

    const initState = {
        sum: 0
    }

    const a$ = new StreamSink<string>();
    const b$ = new StreamSink<string>();

    const a: Cell<number> = a$.hold("0").map(validNumber);
    const b: Cell<number> = b$.hold("0").map(validNumber);

    const sum: Cell<number> = a.lift(b, (a_, b_) => a_ + b_);

    const actions = {
        changedA: (e: ChangeEvent<HTMLInputElement>) => a$.send(e.target.value),
        changedB: (e: ChangeEvent<HTMLInputElement>) => b$.send(e.target.value)
    };

    return <SodiumReaction<typeof actions, typeof initState>
        render={render}
        actions={actions}
        initState={initState}
        sodiumState={{sum}}
    />
}



