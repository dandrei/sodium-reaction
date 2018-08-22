import * as React from 'react';
import {Cell, StreamSink, Unit} from "sodiumjs";

import {sodiumReaction} from '../sodium-reaction';

const validNumber = s => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

export default function () {
    const a$ = new StreamSink<string>();
    const b$ = new StreamSink<string>();

    const a: Cell<number> = a$.hold("0").map(validNumber);
    const b: Cell<number> = b$.hold("0").map(validNumber);

    const sum: Cell<number> = a.lift(b, (a_, b_) => a_ + b_);

    return sodiumReaction({
            changedA: (e) => a$.send(e.target.value),
            changedB: (e) => b$.send(e.target.value)
        },
        {sum}
    );
};



