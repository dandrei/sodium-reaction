import {Cell, Operational, StreamSink} from "sodiumjs";
import {Component} from "react";
import * as React from "react";


function bindState(component: Component, stateDefinition: Object) {
    let state = {};
    for (const key in stateDefinition) {
        const cell = stateDefinition[key];
        bindValue(cell, v => component.setState({[key]: v}));
        state = {...state, ...{[key]: cell.sample()}};
    }
    return state;
}

function bindValue<T>(cell: Cell<T>, call: (T) => void): void {
    Operational.updates(cell).listen(t => {
        call(t);
    });
}

class SodiumReaction extends React.PureComponent<any, any> {
    state;

    constructor(props) {
        super(props);
        this.state = bindState(this, this.props.stateDefinition);
    }

    render() {
        // @ts-ignore
        return this.props.children({
                ...this.props,
                state: this.state
            }
        );
    }
}

export function sodiumReaction(props, stateDefinition) {
    return (_props) => (
        <SodiumReaction {...props} stateDefinition={stateDefinition}>{_props.children}</SodiumReaction>);
}