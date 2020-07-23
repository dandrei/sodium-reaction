import * as React from "react";
import {FRP3} from './FRP3'


export const Example3 = () => (
    <FRP3 render={({
                       state: {inputs, count, sum},
                       actions: {up, dn, change, remove}
                   }) =>
        <>
            <div>
                <button onClick={up}>+</button>
                <button onClick={dn}>-</button>
            </div>

            <div>
                Inputs: {count} Sum: {sum}
            </div>

            <div>
                {inputs && inputs.map(({key, value}) => <div key={key}>
                    <input value={value} key={key} onChange={change(key)}/>
                    <button onClick={remove(key)}>x</button>
                </div>)}
            </div>
        </>
    }/>
);
