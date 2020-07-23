import * as React from 'react';
import {FRP1} from "./FRP1";


export const Example1 = () => (
    <FRP1 render={({state, actions: {up, dn}}) => (
        <>
            <div>
                <button onClick={up}>+</button>
                <button onClick={dn}>-</button>
            </div>
            <span>{state.value}</span>
        </>
    )}/>
);

