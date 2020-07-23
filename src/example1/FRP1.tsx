import {Cell, StreamSink} from "sodiumjs";
import * as React from "react";
import {Renderer, SodiumReaction} from "../lib/SodiumReaction";

export function FRP1({render}: { render: Renderer<typeof actions, typeof initState> }) {

    const initState = {
        value: 0
    }

    const value$ = new StreamSink<number>();
    const value: Cell<number> = value$.accum(
        initState.value,
        (a: number, v: number) => a + v
    );

    const actions = {
        up: () => value$.send(1),
        dn: () => value$.send(-1)
    };

    return <SodiumReaction<typeof actions, typeof initState>
        render={render}
        actions={actions}
        initState={initState}
        sodiumState={{value}}
    />
}


