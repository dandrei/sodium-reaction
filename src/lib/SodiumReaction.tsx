import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Cell, Operational} from "sodiumjs";

//
// bind single value
//

export function bindValue<T>(cell: Cell<T>, call: (v: T) => void): void {
    Operational
        .updates(cell)
        .listen(v => call(v));
}

//
// bind overall state
//

type Setter<S> = Dispatch<SetStateAction<S>>

export function bindState<T extends Setter<S>, S>(setState: T, sodiumState: SodiumState<S>) {

    for (const key in sodiumState) {

        if (!sodiumState.hasOwnProperty(key)) {
            continue;
        }

        const cell = sodiumState[key];

        bindValue(
            cell,
            v => setState(prev => ({...prev, [key]: v}))
        );
    }
}

//
//
//

export type Renderer<A, S> = (_: { actions: A, state: S }) => JSX.Element

type SodiumState<T> = {
    [P in keyof T]: Cell<T[P]>
}

export type TSodiumReaction<A, S> = {
    render: Renderer<A, S>
    actions: A
    initState: S,
    sodiumState: SodiumState<S>
}

export function SodiumReaction<A, S>(
    {
        render,
        actions,
        initState,
        sodiumState
    }: TSodiumReaction<A, S>) {

    const [state, setState] = useState<S>(initState);

    useEffect(
        () => bindState(setState, sodiumState),
        [sodiumState]
    );

    return render({
            actions,
            state
        }
    );
}



