import * as React from "react";
import {FRP2} from './FRP2'

export const Example2 = () => (
    <FRP2 render={({state: {sum}, actions: {changedA, changedB}}) => (
        <>
            <div>
                <input onChange={changedA}/>
                <input onChange={changedB}/>
            </div>
            <span>{sum}</span>
        </>
    )}/>
);
