import {Cell, StreamSink} from "sodiumjs";
import {sodiumReaction} from '../sodium-reaction';
import * as React from "react";


export default function () {
    const value$ = new StreamSink<number>();
    const value: Cell<number> = value$.accum(0, (a, v) => a + v);

    return sodiumReaction({
            up: () => value$.send(1),
            dn: () => value$.send(-1)
        },
        {value}
    );
};


