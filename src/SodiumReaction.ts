import {Cell, Operational, StreamSink} from "sodiumjs";

export function pair<T>(initial: T): [(T) => void, Cell<T>] {

    const stream: StreamSink<T> = new StreamSink<T>();

    const call: (T) => void = (value: T) => {
        stream.send(value);
    };

    const cell: Cell<T> = stream.hold(initial);

    return [call, cell];
}

export function pipe<T>(cell: Cell<T>, call: (T) => void): void {
    Operational.updates(cell).listen(t => {
        call(t);
    });
}